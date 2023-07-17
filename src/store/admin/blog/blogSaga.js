import { takeLatest } from "redux-saga/effects";
import {
  handleOnBulkDeleteBlog,
  handleOnBulkDeleteMyBlog,
  handleOnDeleteBlog,
  handleOnDeleteMyBlog,
  handleOnGetBlogs,
  handleOnGetBlogsForAdmin,
  handleOnGetMyBlogs,
  handleOnPostBlog,
} from "./blogHandlers";
import {
  onBulkDeleteBlog,
  onBulkDeleteMyBlog,
  onDeleteBlog,
  onDeleteMyBlog,
  onGetBlogs,
  onGetBlogsForAdmin,
  onGetMyBlogs,
  onPostBlog,
} from "./blogSlice";

export default function* adminBlogSaga() {
  yield takeLatest(onGetBlogsForAdmin.type, handleOnGetBlogsForAdmin);
  yield takeLatest(onGetBlogs.type, handleOnGetBlogs);
  yield takeLatest(onGetMyBlogs.type, handleOnGetMyBlogs);
  yield takeLatest(onPostBlog.type, handleOnPostBlog);
  yield takeLatest(onDeleteBlog.type, handleOnDeleteBlog);
  yield takeLatest(onBulkDeleteBlog.type, handleOnBulkDeleteBlog);
  yield takeLatest(onDeleteMyBlog.type, handleOnDeleteMyBlog);
  yield takeLatest(onBulkDeleteMyBlog.type, handleOnBulkDeleteMyBlog);
}
