import React from "react";
import { Link } from "react-router-dom";
import { convertCoreObjectItems } from "../../utils/helper";

const SearchItemMod = ({ item, type, objectOriginal }) => {
  const newItem = convertCoreObjectItems(item, type, objectOriginal, 115);

  return (
    <Link to={newItem.slug} className="tw-transition-all">
      <div className="c-search-item flex items-center gap-x-5 px-[0.5rem] tw-transition-all hover:border-l-[6px] hover:solid hover:border-tw-primary hover:bg-tw-light">
        <img
          srcSet={newItem?.image}
          className="w-[50px] h-[50px] object-cover flex-shrink-0 rounded-xl"
          alt={newItem?.name}
        />
        <div className="flex-1 text-sm">
          <h3 className="mb-[.25rem]">
            {newItem?.category_name && <strong>{newItem.category_name}</strong>}{" "}
            {newItem?.name}
          </h3>
          <p className="text-gray-400">{newItem.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItemMod;
