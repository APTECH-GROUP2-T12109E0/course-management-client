import { Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import EmptyDataCom from "../../components/common/EmptyDataCom";
import Overlay from "../../components/common/Overlay";
import { HeadingH2Com } from "../../components/heading";
import { IconRemoveCom, IconSearchCom } from "../../components/icon";
import useDebounceOnChange from "../../hooks/useDebounceOnChange";
import SearchItemMod from "./SearchItemMod";

const HomeSearchMod = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const searchDebounce = useDebounceOnChange(search, 2000);
  const [dataSearch, setDataSearch] = useState([]);

  const inputRef = useRef(null);

  const handleChangeSearch = (e) => {
    setIsLoading(true);
    setIsSearch(true);
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (searchDebounce) getSearchData(searchDebounce);
  }, [searchDebounce]);

  useEffect(() => {
    if (search) setIsSearch(true);
  }, [search]);

  const handleShowSearch = () => {
    setIsSearch(!isSearch);
    if (isSearch) {
      setSearch("");
      setDataSearch([]);
      if (inputRef.current) inputRef.current.value = "";
    } else {
      inputRef.current.focus();
    }
  };

  const getSearchData = async (searchDebounce) => {
    try {
      const res = await axiosInstance.post(
        `/home/search?name=${searchDebounce}`
      );
      console.log("res:", res);
      setDataSearch(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Overlay isShow={isSearch} onClick={handleShowSearch} />
      <div className="c-search relative z-50">
        <div className="bg-tw-light rounded-full shadow-primary p-2 w-full flex items-center">
          <div className="flex-1 px-2">
            <input
              ref={inputRef}
              type="text"
              name="keyword"
              placeholder="Search course, author, blog..."
              className="bg-transparent text-sm placeholder:text-gray-400 text-black w-full pl-3 py-2 rounded-full outline-none"
              onChange={handleChangeSearch}
            />
          </div>
          <button
            className={`w-[42px] h-10 rounded-full text-tw-light tw-transition-all flex items-center justify-center flex-shrink-0 hover:opacity-60 ${
              isSearch ? "bg-tw-light-pink" : "bg-primary"
            }`}
            onClick={handleShowSearch}
          >
            {/* Xứ lý nếu có search thì hiện Icon Remove + style text-tw-danger hoặc bg-tw-orange */}
            {isSearch ? (
              <IconRemoveCom></IconRemoveCom>
            ) : (
              <IconSearchCom></IconSearchCom>
            )}
          </button>
        </div>
        {isSearch && (
          <div className="c-search-result w-full sm:w-[600px] bg-white absolute top-full left-0  lg:left-[-15%] translate-y-5 z-50 rounded-lg">
            {isLoading ? (
              <div className="p-4">
                <Skeleton avatar paragraph={{ rows: 4 }} active />
              </div>
            ) : dataSearch.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-6 py-[0.5rem] bg-gray-200 rounded-lg">
                  <h4 className="font-medium text-sm text-tw-light-pink">
                    See all {dataSearch.length}{" "}
                    {dataSearch.length > 1 ? "results" : "result"}
                  </h4>
                  <button className="flex items-center justify-center w-16 h-11"></button>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-y-5 mb-6">
                    {dataSearch.map((item) => (
                      <SearchItemMod key={item.id} item={item}></SearchItemMod>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold mb-[1rem]">
                    Related results
                  </h3>
                  <div className="flex flex-col gap-y-3">
                    <p>
                      <strong>Programming</strong> What is Web3, how does NFT
                      work ?
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <EmptyDataCom text="No result" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSearchMod;