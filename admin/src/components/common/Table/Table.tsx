import * as React from "react";

import { Box, Divider } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableMUI from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

type MinTableItem = { id: string | number };

type Props<T extends MinTableItem> = {
  headers: {
    key: keyof T;
    label?: string;
    center?: boolean;
    render?: (value: any, index: number, item: T) => React.ReactNode;
  }[];
  data: T[];
  isLoading?: boolean;
  actions?: {
    onDelete?: (item: any, index: number) => void;
    onEdit?: (item: any, index: number) => void;
    onDetail?: (item: any, index: number) => void;
    others?: {
      icon: (item: any, index: number) => React.ReactNode;
      label: (item: any, index: number) => string;
      onClick: (item: any, index: number) => void;
      hidden?: (item: any, index: number) => boolean;
    }[];
  };
  pagination?: {
    page: number;
    total_page: number;
    total_item: number;
    onChange: (page: number) => void;
  };
};

const Table = <T extends MinTableItem>({
  headers,
  data,
  actions,
  pagination,
}: Props<T>) => {
  console.log("actions ", actions);
  return (
    <Paper>
      <Box
        sx={{
          p: 2,
        }}
      >
        <TableContainer>
          <TableMUI sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => {
                  return (
                    <TableCell
                      key={`header-${header.key as string}`}
                      sx={{
                        backgroundColor: "#F4F6F8",
                        borderRadius:
                          index === 0
                            ? "8px 0px 0px 8px"
                            : !actions && index === headers.length - 1
                            ? "0px 8px 8px 0px"
                            : "0px",
                      }}
                    >
                      {header.label}
                    </TableCell>
                  );
                })}
                {actions && (
                  <TableCell
                    sx={{
                      backgroundColor: "#F4F6F8",
                      borderRadius: "0px 8px 8px 0px",
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={`row-${index}`}
                  sx={{
                    ":hover": {
                      backgroundColor: "rgba(145, 158, 171, 0.08);",
                    },
                  }}
                >
                  {headers.map((header, indexColumn) => {
                    return (
                      <TableCell
                        key={`column-${indexColumn}`}
                        component="th"
                        scope="row"
                      >
                        <>
                          {header.render
                            ? header.render(item[header.key], index, item)
                            : item[header.key]}
                        </>
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell component="th" scope="row">
                      {actions.onDelete && (
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            actions.onDelete && actions.onDelete(item, index)
                          }
                        >
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {actions.onEdit && (
                        <Tooltip
                          title="Edit"
                          onClick={() =>
                            actions.onEdit && actions.onEdit(item, index)
                          }
                        >
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {actions.onDetail && (
                        <Tooltip
                          title="View"
                          onClick={() =>
                            actions.onDetail && actions.onDetail(item, index)
                          }
                        >
                          <IconButton>
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {actions.others &&
                        actions.others.map((action, index) => {
                          if (action.hidden && action.hidden(item, index)) {
                            return <div key={`action-${index}`}></div>;
                          } else {
                            return (
                              <Tooltip
                                key={`action-${index}`}
                                title={action.label(item, index)}
                                onClick={() => action.onClick(item, index)}
                              >
                                <IconButton>
                                  {action.icon(item, index)}
                                </IconButton>
                              </Tooltip>
                            );
                          }
                        })}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableMUI>
          {data.length <= 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100px",
              }}
            >
              Not found
            </Box>
          )}
        </TableContainer>
      </Box>
      {pagination && (
        <>
          <Divider />
          <Box
            sx={{
              py: 1,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Pagination
              count={pagination.total_page}
              page={pagination.page}
              onChange={(e, page) => pagination.onChange(page)}
              size="large"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Table;
