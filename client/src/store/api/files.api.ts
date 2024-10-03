import { createApi } from "@reduxjs/toolkit/query/react";

import { myBaseQuery } from "./base.api";
import {
  DeleteFileResponse,
  FileResponse,
  UpdateFileRequest,
  UploadFileRequest,
} from "../../types";

export const fileApiSlice = createApi({
  reducerPath: "fileApi",
  baseQuery: myBaseQuery,
  tagTypes: ["File"],
  endpoints: (builder) => ({
    // Upload a new file
    uploadFile: builder.mutation<FileResponse, UploadFileRequest>({
      query: (uploadData) => {
        const formData = new FormData();
        formData.append("file", uploadData.file);
        return {
          url: "/files/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["File"],
    }),

    // Update an existing file
    updateFile: builder.mutation<
      FileResponse,
      { fileId: string; data: UpdateFileRequest }
    >({
      query: ({ fileId, data }) => {
        const formData = new FormData();
        formData.append("file", data.file);
        return {
          url: `/files/${fileId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { fileId }) => [
        { type: "File", id: fileId },
      ],
    }),

    // Get a file by ID
    getFile: builder.query<FileResponse, string>({
      query: (fileId) => `/files/${fileId}`,
      providesTags: (result, error, fileId) => [{ type: "File", id: fileId }],
    }),

    // Delete a file by ID
    deleteFile: builder.mutation<DeleteFileResponse, string>({
      query: (fileId) => ({
        url: `/files/${fileId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, fileId) => [
        { type: "File", id: fileId },
      ],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUpdateFileMutation,
  useGetFileQuery,
  useDeleteFileMutation,
} = fileApiSlice;
