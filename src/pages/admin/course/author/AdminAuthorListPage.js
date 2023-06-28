import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { axiosBearer } from "../../../../api/axiosInstance";
import { BreadcrumbCom } from "../../../../components/breadcrumb";
import { ButtonCom } from "../../../../components/button";
import GapYCom from "../../../../components/common/GapYCom";
import { HeadingFormH5Com, HeadingH1Com } from "../../../../components/heading";
import {
  IconEditCom,
  IconRemoveCom,
  IconTrashCom,
} from "../../../../components/icon";
import { TableCom } from "../../../../components/table";
import { API_AUTHOR_URL } from "../../../../constants/endpoint";
import { showMessageError } from "../../../../utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  MAX_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_REQUIRED,
  MESSAGE_UPLOAD_REQUIRED,
  MIN_LENGTH_NAME,
} from "../../../../constants/config";
import { v4 } from "uuid";
import { InputCom } from "../../../../components/input";
import { LabelCom } from "../../../../components/label";
import ReactModal from "react-modal";
import { ImageCropUploadAntCom } from "../../../../components/ant";

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .min(MIN_LENGTH_NAME, MESSAGE_FIELD_MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME, MESSAGE_FIELD_MAX_LENGTH_NAME),
  image: yup.string().required(MESSAGE_UPLOAD_REQUIRED),
});

const AdminAuthorListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableKey, setTableKey] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [authors, setAuthors] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState([]);

  // More Action Menu
  const dropdownItems = [
    {
      key: "1",
      label: (
        <div
          rel="noopener noreferrer"
          className="hover:text-tw-success transition-all duration-300"
          onClick={() => toast.info("Developing...")}
        >
          Export
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          rel="noopener noreferrer"
          className="hover:text-tw-danger transition-all duration-300"
          // onClick={() => handleDeleteMultipleRecords()}
        >
          Remove All
        </div>
      ),
    },
  ];
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i,
      width: "70px",
    },
    {
      name: "Author Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img width={50} height={50} src={`${row.image}`} alt={row.name} />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCom
            className="px-3 rounded-lg mr-2"
            backgroundColor="info"
            onClick={() => {
              handleEdit(row.id);
            }}
          >
            <IconEditCom className="w-5"></IconEditCom>
          </ButtonCom>
          {/* <ButtonCom
            className="px-3 rounded-lg mr-2"
            onClick={() => {
              alert(`View Section id: ${row.id}`);
            }}
          >
            <IconEyeCom className="w-5"></IconEyeCom>
          </ButtonCom> */}
          <ButtonCom
            className="px-3 rounded-lg"
            backgroundColor="danger"
            onClick={() => {
              handleDelete(row.id, row.name);
            }}
          >
            <IconTrashCom className="w-5"></IconTrashCom>
          </ButtonCom>
        </>
      ),
    },
  ];

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const resetValues = () => {
    reset();
  };

  /********* Library Function Area ********* */
  const handleRowSelection = (currentRowsSelected) => {
    setSelectedRows(currentRowsSelected.selectedRows);
  };
  // Clear Selected after Mutiple Delete
  const clearSelectedRows = () => {
    setSelectedRows([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  /********* Fetch API Area ********* */
  const getAuthors = async () => {
    try {
      const res = await axiosBearer.get(API_AUTHOR_URL);
      console.log(res.data);
      setAuthors(res.data);
      setFilterAuthor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorById = async (authorId) => {
    try {
      const res = await axiosBearer.get(`${API_AUTHOR_URL}/${authorId}`);
      reset(res.data);

      const resImage = res.data.image;
      const imgObj = [
        {
          uid: v4(),
          name: resImage?.substring(resImage.lastIndexOf("/") + 1),
          status: "done",
          url: resImage,
        },
      ];

      setImage(imgObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search in Table
  useEffect(() => {
    const result = authors.filter((course) => {
      const keys = Object.keys(course);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = course[key];
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
    setFilterAuthor(result);
  }, [authors, search]);

  // Delete one
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      html: `You will delete author: <span className="text-tw-danger">${name}</span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7366ff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosBearer.delete(
            `${API_AUTHOR_URL}?authorId=${id}`
          );
          getAuthors();
          reset(res.data);
          toast.success(res.data.message);
        } catch (error) {
          showMessageError(error);
        }
      }
    });
  };

  //********* Update Area *********
  const handleEdit = async (authorId) => {
    try {
      setIsFetching(true);
      await getAuthorById(authorId);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmitForm = async (values) => {
    try {
      setIsLoading(!isLoading);
      const res = await axiosBearer.post(`${API_AUTHOR_URL}`, values);
      // Update sections State
      setAuthors((prev) => {
        const newData = prev.map((item) => {
          if (item.id === values.id) {
            return {
              ...item,
              ...values,
            };
          }
          return item;
        });
        return newData;
      });
      toast.success(`${res.data.message}`);
    } catch (error) {
      showMessageError(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Admin Author</HeadingH1Com>
        <BreadcrumbCom
          items={[
            {
              title: "Admin",
              slug: "/admin",
            },
            {
              title: "Course",
              slug: "/admin/courses",
            },
            {
              title: "Author",
              isActive: true,
            },
          ]}
        />
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <span>
                <TableCom
                  tableKey={tableKey}
                  urlCreate={`/admin/courses/authors/create`}
                  title="List Author"
                  columns={columns}
                  items={filterAuthor}
                  search={search}
                  dropdownItems={dropdownItems}
                  setSearch={setSearch}
                ></TableCom>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="modal-overplay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className={`modal-content scroll-hidden  max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg outline-none transition-all duration-300 ${
          isOpen ? "w-50" : "w-0"
        }`}
      >
        <div className="card-header bg-tw-primary flex justify-between text-white">
          <HeadingFormH5Com className="text-2xl">Edit Section</HeadingFormH5Com>
          <ButtonCom backgroundColor="danger" className="px-2">
            <IconRemoveCom
              className="flex items-center justify-center p-2 w-10 h-10 rounded-xl bg-opacity-20 text-white"
              onClick={() => setIsOpen(false)}
            ></IconRemoveCom>
          </ButtonCom>
        </div>
        <div className="card-body">
          <form
            className="theme-form"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <InputCom
              type="hidden"
              control={control}
              name="id"
              register={register}
              placeholder="Author hidden id"
            ></InputCom>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <LabelCom htmlFor="name" isRequired>
                    Author Name
                  </LabelCom>
                  <InputCom
                    type="text"
                    control={control}
                    name="name"
                    register={register}
                    placeholder="Input author name"
                    errorMsg={errors.name?.message}
                    defaultValue={watch("name")}
                  ></InputCom>
                </div>
              </div>
              <GapYCom className="mb-3"></GapYCom>
              <div className="row">
                <div className="col-sm-12 text-center">
                  <LabelCom htmlFor="image" isRequired>
                    Avatar
                  </LabelCom>
                  <div className="w-full">
                    <ImageCropUploadAntCom
                      name="image"
                      onSetValue={setValue}
                      errorMsg={errors.image?.message}
                      editImage={image}
                      aspect={4 / 4}
                    ></ImageCropUploadAntCom>
                    <InputCom
                      type="hidden"
                      control={control}
                      name="image"
                      register={register}
                    ></InputCom>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer flex justify-end gap-x-5">
              <ButtonCom type="submit" isLoading={isLoading}>
                Update
              </ButtonCom>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default AdminAuthorListPage;
