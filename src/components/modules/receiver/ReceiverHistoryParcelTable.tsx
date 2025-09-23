import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Columns3Icon,
  InfoIcon,
  Package,
  SearchIcon,
  Truck,
  XIcon,
} from "lucide-react";
import { useId, useState } from "react";

import Error from "@/components/Error";
import Information from "@/components/Information";
import Loading from "@/components/Loading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useGetReceiverParcelHistoryQuery } from "@/redux/features/parcel/parcelApi";
import { IParcel } from "@/types";
import { getNameInitials } from "@/utils/getNameInitials";
import { getStatusColor } from "@/utils/getStatusColor";
import { format } from "date-fns";
import { formatStreetCity } from "@/utils/formatAddress";

const columns: ColumnDef<IParcel>[] = [
  {
    header: "Sender",
    accessorKey: "sender",
    cell: ({ row }) => {
      const name = row?.original?.sender?.name;
      const initials = getNameInitials(name);

      return (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{formatStreetCity(row.original?.pickupAddress)}</div>
            <div className="text-sm text-muted-foreground">{row.original?.sender?.email}</div>
            <div className="text-sm text-muted-foreground">{row.original?.sender?.phone}</div>
          </div>
        </div>
      );
    },
    size: 210,
    enableHiding: true,
    enableSorting: false,
  },
  {
    header: "Receiver",
    accessorKey: "receiver",
    cell: ({ row }) => {
      const name = row.original?.receiver?.name;
      const initials = getNameInitials(name);
      return (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{row.original?.receiver?.name}</div>
            <div className="text-sm text-muted-foreground">{formatStreetCity(row.original?.deliveryAddress)}</div>
            <div className="text-sm text-muted-foreground">{row.original?.receiver?.email}</div>
            <div className="text-sm text-muted-foreground">{row.original?.receiver?.phone}</div>
          </div>
        </div>
      );
    },
    size: 210,
    enableHiding: true,
    enableSorting: false,
  },
  {
    header: "Estimated Delivery",
    accessorKey: "estimatedDelivery",
    cell: ({ row }) => <div>{format(row.getValue("estimatedDelivery"), "PPP")}</div>,
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Delivered At",
    accessorKey: "deliveredAt",
    cell: ({ row }) => {
      const deliveredAt = row.getValue("deliveredAt");
      return <div>{deliveredAt ? format(deliveredAt as Date, "PPP") : "-"}</div>;
    },
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Cancelled At",
    accessorKey: "cancelledAt",
    cell: ({ row }) => {
      const cancelledAt = row.getValue("cancelledAt");
      return <div>{cancelledAt ? format(cancelledAt as Date, "PPP") : "-"}</div>;
    },
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },

  {
    header: "Parcel Info",
    accessorKey: "packageType",
    cell: ({ row }) => {
      const packageType = `${row.original?.type.charAt(0).toUpperCase()}${row.original?.type.slice(1)}`;
      const shippingType = `${row.original?.shippingType.charAt(0).toUpperCase()}${row.original?.shippingType.slice(
        1
      )}`;
      return (
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" />
            {packageType}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Truck className="h-4 w-4" />
            {shippingType}
          </div>
        </div>
      );
    },
    size: 130,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Paid",
    accessorKey: "isPaid",
    cell: ({ row }) => {
      return <div>{row.original?.isPaid ? "Yes" : "No"}</div>;
    },
    size: 100,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Current Location",
    accessorKey: "currentLocation",
    cell: ({ row }) => {
      const currentLocation = row.getValue("currentLocation");
      return <div>{currentLocation ? (currentLocation as string) : "-"}</div>;
    },
    size: 160,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Tracking ID",
    accessorKey: "trackingId",
    cell: ({ row }) => <div className="text-left">{row.getValue("trackingId")}</div>,
    size: 210,
    enableHiding: true,
    enableSorting: true,
  },

  {
    header: "Status",
    accessorKey: "currentStatus",
    cell: ({ row }) => (
      <Badge className={getStatusColor(row.getValue("currentStatus"))}>{row.getValue("currentStatus")}</Badge>
    ),
    size: 100,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return <div>{format(row.getValue("createdAt") as Date, "PPP")}</div>;
    },
    size: 180,
    enableHiding: true,
    enableSorting: true,
  },
];

export default function ReceiverHistoryParcelTable() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    receiver: false,
    createdAt: false,
    cancelledAt: false,
    isPaid: false,
    // estimatedDelivery: false,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Add search states
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const currentQuery = {
    searchTerm: appliedSearchTerm || undefined,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sort: sorting.length > 0 ? sorting[0].id : "-createdAt",
  };

  const {
    data: historyParcels,
    isLoading: isLoadingHistoryParcels,
    isError: isErrorHistoryParcels,
  } = useGetReceiverParcelHistoryQuery({
    ...currentQuery,
  });

  // Search handlers
  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setAppliedSearchTerm("");
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const table = useReactTable({
    data: historyParcels?.data || [],
    columns,
    // Server-side pagination configuration
    manualPagination: true,
    pageCount: historyParcels?.meta?.totalPage,
    rowCount: historyParcels?.meta?.total,

    // Server-side sorting configuration
    manualSorting: true,
    enableSortingRemoval: true,
    enableMultiSort: false,

    // manual filtering
    // manualFiltering: true,

    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),

    // onSortingChange: setSorting,
    // getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    // getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // Event handlers
    onSortingChange: (updater) => {
      setSorting(updater);
      // Reset to first page when sorting changes
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  if (isLoadingHistoryParcels) {
    return <Loading message="Loading parcels data..." />;
  }

  if (!isLoadingHistoryParcels && isErrorHistoryParcels) {
    return <Error />;
  }

  if (!isLoadingHistoryParcels && !isErrorHistoryParcels && historyParcels && historyParcels?.data.length === 0) {
    return <Information message="No parcel data available" />;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by tracking id / address */}
          <div className="relative">
            <Input
              // id={id}
              className="peer ps-9 pe-9"
              placeholder="Search..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
            {searchTerm && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-5 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear input"
                onClick={handleClearSearch}
              >
                <XIcon size={16} aria-hidden="true" />
              </button>
            )}
            {
              <button
                onClick={handleSearch}
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} aria-hidden="true" />
              </button>
            }
            <div className="absolute -inset-y-1 text-muted-foreground/80">
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon size={14} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search by tracking ID or address</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3Icon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="min-h-[80vh]">
        <div className="bg-background rounded-md border overflow-auto">
          <Table className="table-auto min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} style={{ width: `${header.getSize()}px` }} className="h-11">
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <div
                            className={cn(
                              header.column.getCanSort() &&
                                "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={(e) => {
                              // Enhanced keyboard handling for sorting
                              if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e);
                              }
                            }}
                            tabIndex={header.column.getCanSort() ? 0 : undefined}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
                              desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => {
                      // Check if this is the "estimatedDelivery" column
                      if (cell.column.id === "estimatedDelivery") {
                        // Render custom content
                        return (
                          <TableCell key={cell.id} className="last:py-0">
                            {row.original.estimatedDelivery
                              ? new Date(row.original.estimatedDelivery).toLocaleDateString()
                              : "-"}
                          </TableCell>
                        );
                      }

                      // Default rendering for other columns
                      return (
                        <TableCell key={cell.id} className="last:py-0">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{" "}
            of <span className="text-foreground">{table.getRowCount().toString()}</span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
