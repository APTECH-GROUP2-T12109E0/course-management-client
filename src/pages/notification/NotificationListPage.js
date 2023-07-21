import React, { useEffect, useState } from "react";
import { SelectDefaultAntCom } from "../../components/ant";
import {
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_NO_ITEM_SELECTED,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
  statusBlogItems,
} from "../../constants/config";
import { ButtonCom } from "../../components/button";
import { IconTrashCom } from "../../components/icon";
import Swal from "sweetalert2";
import { axiosBearer } from "../../api/axiosInstance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  convertSecondToDiffForHumans,
  showMessageError,
} from "../../utils/helper";
import LoadingCom from "../../components/common/LoadingCom";
import { HeadingH1Com, HeadingH3Com } from "../../components/heading";
import GapYCom from "../../components/common/GapYCom";
import { TableCom } from "../../components/table";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/auth/authSelector";
import {
  onAllDeleteNotification,
  onAllNotification,
  onDeleteNotification,
  onReadAllNotification,
  onReadNotification,
} from "../../store/course/courseSlice";

const NotificationListPage = () => {
  // Local State
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [search, setSearch] = useState("");
  const [notifs, setNotifs] = useState([]);
  const [filterNoti, setFilterNoti] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  //State Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.course);

  const userToId = user.id;
  console.log("userToId", userToId);

  //manage status and event in form
  const { control, reset } = useForm({
    resolver: yupResolver(),
  });
  /********* Display Data ********* */
  function getNotificationListItem(row) {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={row.userFrom.first_name} src={row.userFrom.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component="span" variant="body2">
                <React.Fragment>{row.userFrom.first_name} </React.Fragment>
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              {row.content}
              <Typography component="span" variant="body2">
                <br />
                {convertSecondToDiffForHumans(
                  Math.floor(Date.now() / 1000) -
                    Math.floor(new Date(row.created_at).getTime() / 1000)
                )}{" "}
                ago...
              </Typography>
            </React.Fragment>
          }
        />
        {/* <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        display: "inline",
                        color: row.read ? "black" : "#fff",
                      }}
                      component="span"
                      variant="body2"
                    >
                      {row.read ? (
                        row.userFrom.first_name
                      ) : (
                        <React.Fragment>
                          {row.userFrom.first_name}{" "}
                          <strong style={{ color: "violet" }}>unread</strong>
                        </React.Fragment>
                      )}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    {row.content}
                    <Typography
                      sx={{
                        display: "inline",
                        color: row.read ? "black" : "#cfc6d5",
                      }}
                      component="span"
                      variant="body2"
                    >
                      <br></br>
                      {convertSecondToDiffForHumans(
                        Math.floor(Date.now() / 1000) -
                          Math.floor(
                            new Date(row.created_at).getTime() / 1000
                          )
                      )}{" "}
                      ago...
                    </Typography>
                  </React.Fragment>
                }
              /> */}
      </ListItem>
    );
  }

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Notification",
      selector: (row) => getNotificationListItem(row),
      sortable: true,
      width: "400px",
    },
    {
      name: "Read",
      cell: (row) => (
        <strong style={{ color: row.read ? "blueviolet" : "violet" }}>
          {row.read ? "read" : "unread"}
        </strong>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDeleteBlog(row);
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];

  /********* More Action Menu ********* */
  const dropdownItems = [
    {
      key: "1",
      label: (
        <div
          rel="noopener noreferrer"
          className="hover:text-tw-danger transition-all duration-300"
          onClick={() => handleDeleteMultipleRecords()}
        >
          Remove All
        </div>
      ),
    },
  ];
  /********* Search ********* */
  useEffect(() => {
    const result = notifications.filter((notif) => {
      const keys = Object.keys(notif);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = notif[key];
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        if (
          typeof value === "number" &&
          String(value).toLowerCase() === search.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });
    setFilterNoti(result);
  }, [notifications, search]);

  /********* Get All Notification ********* */
  useEffect(() => {
    if (user) {
      const data = dispatch(onAllNotification({ userToId }));
      setNotifs(data);
    }
  }, [dispatch]); 

  /********* Delete one API ********* */
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };

  const handleDeleteBlog = (row) => {
    const { id, userFrom } = row;
    console.log("row", row);
    console.log("row.id", row.id);
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete blog: <span class="text-tw-danger">${userFrom.first_name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(onDeleteNotification(id));
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  /********* Multi Delete API ********* */
  const handleDeleteMultipleRecords = () => {
    if (selectedRows.length === 0) {
      toast.warning(MESSAGE_NO_ITEM_SELECTED);
      return;
    }

    try {
      dispatch(onAllDeleteNotification(userToId));
      toast.success(`Delete ${selectedRows.length} notifs success`);
    } catch (error) {
      showMessageError(error);
    } 
  };

  return (
    <>
      {isFetching && <LoadingCom />}
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <span>
                <TableCom
                  tableKey={tableKey}
                  title="All Notifications"
                  columns={columns}
                  items={filterNoti}
                  search={search}
                  setSearch={setSearch}
                  dropdownItems={dropdownItems}
                  onSelectedRowsChange={handleRowSelection} // selected Mutilple
                  clearSelectedRows={handleDeleteMultipleRecords}
                ></TableCom>
              </span>
            </div>
            <div className="card-body flex gap-x-4 h-[50vh]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationListPage;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { onAllNotification, onReadAllNotification } from "../../store/course/courseSlice";
// import { selectUserId } from "../../store/auth/authSelector";

// const NotificationListPage = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { notifications } = useSelector((state) => state.course);
//  const userToId = user.id;
// console.log("userToId",userToId);
//   useEffect(() => {

//     if (user) {
//       console.log('ok user');
//       dispatch(onAllNotification({userToId}));

//     }
//   }, [user, userToId, dispatch]);

//   return (
//     <div>
//     <h1>Notification List</h1>
//     {notifications && notifications.map((notification) => (
//       <div key={notification.id}>{notification.content}</div>
//     ))}
//   </div>
//   );
// };

// export default NotificationListPage;
