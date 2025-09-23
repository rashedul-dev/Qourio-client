import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  PaginationState,
  Row,
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
  EllipsisIcon,
  InfoIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

import Error from "@/components/Error";
import Information from "@/components/Information";
import Loading from "@/components/Loading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useBlockUserByIdMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { IUser } from "@/types";
import { IsActive, Role } from "@/types/user-type";
import { getNameInitials } from "@/utils/getNameInitials";
import { getUserIsActiveStatusColor } from "@/utils/getStatusColor";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import z from "zod";
import { CreateStuffDialog } from "./CreateStuff";

// schema for isActive
const isActiveSchema = z.object({
  isActive: z.literal([IsActive.ACTIVE, IsActive.INACTIVE, IsActive.BLOCKED]),
});

const columns: ColumnDef<IUser>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const initials = getNameInitials(name);

      return (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{name}</div>
          </div>
        </div>
      );
    },
    size: 210,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Address",
    accessorKey: "defaultAddress",
    cell: ({ row }) => {
      const defaultAddress = row.getValue("defaultAddress");
      return <div>{`${defaultAddress ? defaultAddress : "-"}`}</div>;
    },
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone");
      return <div>{`${phone ? phone : "-"}`}</div>;
    },
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      return <div>{row.getValue("role")}</div>;
    },
    size: 165,
    enableHiding: true,
    enableSorting: true,
  },

  {
    header: "Is Verified",
    accessorKey: "isVerified",
    cell: ({ row }) => {
      return <div>{row.original?.isVerified ? "Yes" : "No"}</div>;
    },
    size: 100,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Is Active",
    accessorKey: "isActive",
    cell: ({ row }) => (
      <Badge className={getUserIsActiveStatusColor(row.getValue("isActive"))}>{row.getValue("isActive")}</Badge>
    ),
    size: 100,
    enableHiding: true,
    enableSorting: true,
  },
  {
    header: "Is Deleted",
    accessorKey: "isDeleted",
    cell: ({ row }) => {
      return (
        <>
          {row.getValue("isDeleted") ? (
            <Badge className="bg-red-100 text-red-800">{row.getValue("isDeleted")}</Badge>
          ) : (
            "-"
          )}
        </>
      );
    },
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
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

export default function UsersTable() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [roleFilter] = useState<Role[]>([]);
  const [verifiedFilter] = useState<boolean | undefined>(undefined);
  const [statusFilter] = useState<IsActive[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
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
    role: roleFilter.length > 0 ? [...roleFilter] : undefined,
    isActive: statusFilter.length > 0 ? [...statusFilter] : undefined,
    isVerified: verifiedFilter !== undefined ? verifiedFilter : undefined,
  };

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsersQuery({ ...currentQuery });

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

  // handleRoleChange function
  // const handleRoleChange = (checked: boolean, value: Role) => {
  //   setRoleFilter((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((role) => role !== value);
  //     }
  //   });
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  // };

  // // handleStatusChange function
  // const handleStatusChange = (checked: boolean, value: IsActive) => {
  //   setStatusFilter((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((status) => status !== value);
  //     }
  //   });
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  // };

  // // handleIsVerifiedChange function
  // const handleIsVerifiedChange = (checked: boolean, value: boolean) => {
  //   const newValue = value ? true : false;
  //   setVerifiedFilter(checked ? newValue : undefined);
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  // };

  const table = useReactTable({
    data: usersData?.data || [],
    columns,
    // Server-side pagination configuration
    manualPagination: true,
    pageCount: usersData?.meta?.totalPage,
    rowCount: usersData?.meta?.total,

    // Server-side sorting configuration
    manualSorting: true,
    enableSortingRemoval: true,
    enableMultiSort: false,

    // manual filtering
    manualFiltering: true,

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

  if (isLoadingUsers) {
    return <Loading message="Loading users data..." />;
  }

  if (!isLoadingUsers && isErrorUsers) {
    return <Error />;
  }

  const content = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* search */}
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
          <div className="absolute -inset-y-[2px]  text-muted-foreground/80">
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Search by name, email, role, address</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Filter by Role */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Role
              {statusFilter.length > 0 && (
                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  {statusFilter.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-muted-foreground text-xs font-medium">Filters</div>
              <div className="space-y-3">
                {Object.values(Role).map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`role-${i}`}
                      checked={roleFilter.includes(value)}
                      onCheckedChange={(checked: boolean) => handleRoleChange(checked, value)}
                    />
                    <Label htmlFor={`role-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover> */}

        {/* Filter by status */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Active Status
              {statusFilter.length > 0 && (
                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  {statusFilter.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-muted-foreground text-xs font-medium">Filters</div>
              <div className="space-y-3">
                {Object.values(IsActive).map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`status-${i}`}
                      checked={statusFilter.includes(value)}
                      onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
                    />
                    <Label htmlFor={`status-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover> */}

        {/* Filter by isVerified */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Verified Status
              {verifiedFilter !== undefined && (
                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  {verifiedFilter ? "Yes" : "No"}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-muted-foreground text-xs font-medium">Filters</div>
              <div className="space-y-3">
                {["Yes", "No"].map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`isVerified-${i}`}
                      checked={verifiedFilter === (value === "Yes")}
                      onCheckedChange={(checked: boolean) => handleIsVerifiedChange(checked, value === "Yes")}
                    />
                    <Label htmlFor={`isVerified-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover> */}

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

      <div className="flex items-center gap-3">
        {/* Create button */}
        <Button
          onClick={() => setOpen(true)}
          className="dark:bg-primary hover:bg-primary/90 text-cream-50 dark:border-primary text-white"
          variant="outline"
        >
          <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          Create Stuff
        </Button>
        <CreateStuffDialog open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );

  if (!isLoadingUsers && !isErrorUsers && usersData && usersData?.data.length === 0) {
    return (
      <>
        {content}
        <Information message="No user data available" />
      </>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      {content}

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
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="last:py-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
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

function RowActions({ row }: { row: Row<IUser> }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof isActiveSchema>>({
    resolver: zodResolver(isActiveSchema),
    defaultValues: { isActive: IsActive.ACTIVE },
  });
  const [blockUser, { isLoading, isError, error }] = useBlockUserByIdMutation();

  // Block User
  const handleBlock = async (data: z.infer<typeof isActiveSchema>) => {
    try {
      const res = await blockUser({
        id: row.original?._id,
        data,
      }).unwrap();

      if (res.success) {
        setOpen(false);
        toast.success("User blocked successfully");
      }
    } catch (error) {
      console.error("Failed to change status", error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to change status", {
        description: (error as any)?.data?.message,
      });
    }
  }, [isError, error]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" className="shadow-none" aria-label="Edit item">
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <span>Active Status</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Active Status</DialogTitle>
                <DialogDescription>
                  Are you sure you want to change the active status of user {row.original?.name}?
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBlock)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select a status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Status"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
