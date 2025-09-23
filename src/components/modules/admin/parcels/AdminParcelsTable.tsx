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
  FilterIcon,
  InfoIcon,
  Package,
  PlusIcon,
  Scale,
  SearchIcon,
  Truck,
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
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  useBlockParcelMutation,
  useGetAllParcelsQuery,
  useUpdateStatusAndPersonnelMutation,
} from "@/redux/features/parcel/parcelApi";
import { IParcel } from "@/types";
import { ParcelStatus, ParcelType, ShippingType } from "@/types/sender-parcel-type";
import { getNameInitials } from "@/utils/getNameInitials";
import { getStatusColor } from "@/utils/getStatusColor";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { AdminCreateParcelDialog } from "./AdminParcelModal";
import { formatStreetCity } from "@/utils/formatAddress";

const updateStatusPersonnelSchema = z.object({
  currentStatus: z.enum(Object.values(ParcelStatus) as [string]).optional(),
  currentLocation: z.string().nullable().optional(),
  deliveryPersonnelId: z.string().optional(),
});

const updateBlockedStatusSchema = z.object({
  isBlocked: z.string({
    error: "Blocked / unblocked status is required",
  }),
  reason: z.string().optional(),
});

const columns: ColumnDef<IParcel>[] = [
  {
    header: "Sender",
    accessorKey: "sender",
    cell: ({ row }) => {
      const name = row.original?.sender?.name;
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
    header: "Recipient",
    accessorKey: "recipient",
    cell: ({ row }) => {
      const name = row.original?.recipient?.name;
      const initials = getNameInitials(name);
      return (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{row.original?.recipient?.name}</div>
            <div className="text-sm text-muted-foreground"> {formatStreetCity(row.original?.deliveryAddress)}</div>
            <div className="text-sm text-muted-foreground">{row.original?.recipient?.email}</div>
            <div className="text-sm text-muted-foreground">{row.original?.recipient?.phone}</div>
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
    accessorKey: "weight",
    cell: ({ row }) => {
      const packageType = `${row.original?.type.charAt(0).toUpperCase()}${row.original?.type.slice(1)}`;
      const shippingType = `${row.original?.shippingType.charAt(0).toUpperCase()}${row.original?.shippingType.slice(
        1
      )}`;
      return (
        <div className="space-y-1">
          <div className="font-medium flex items-center gap-2">
            <Scale className="h-4 w-4" />
            {row.original?.weight} {row.original?.weightUnit}
          </div>
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
    header: "Cost",
    accessorKey: "fee",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("fee"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
      }).format(amount);
      return (
        <div className="space-y-1">
          <div>{formatted.slice(4)}</div>
          <div className="text-sm text-muted-foreground">BDT</div>
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
    header: "Blocked",
    accessorKey: "isBlocked",
    cell: ({ row }) => {
      const isBlocked = row.getValue("isBlocked");
      return (
        <Badge className={cn({ "bg-green-100 text-green-800": !isBlocked }, { "bg-red-100 text-red-800": isBlocked })}>
          {isBlocked ? "Yes" : "No"}
        </Badge>
      );
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
    header: "Coupon",
    accessorKey: "coupon",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("coupon") ? row.getValue("coupon") : "-"}</div>;
    },
    size: 210,
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
    header: "Delivery Personnel",
    accessorKey: "deliveryPersonnel",
    cell: ({ row }) => {
      const deliveryPersonnel = row.getValue("deliveryPersonnel");
      const personnelArray = Array.isArray(deliveryPersonnel) ? deliveryPersonnel : [];
      return (
        <>
          {personnelArray.length > 0
            ? personnelArray.map((personnel: any) => <div key={personnel.id}>{personnel.name}</div>)
            : "-"}
        </>
      );
    },
    size: 180,
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
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

export default function AdminParcelsTable() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [typeFilter] = useState<ParcelType[]>([]);
  const [shippingTypeFilter] = useState<ShippingType[]>([]);
  const [blockedParcelFilter] = useState<boolean | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    currentLocation: false,
    trackingId: false,
    cancelledAt: false,
    coupon: false,
    isPaid: false,
    estimatedDelivery: false,
    deliveryPersonnel: false,
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
    currentStatus: statusFilter.length > 0 ? [...statusFilter] : undefined,
    type: typeFilter.length > 0 ? [...typeFilter] : undefined,
    shippingType: shippingTypeFilter.length > 0 ? [...shippingTypeFilter] : undefined,
    isBlocked: blockedParcelFilter !== undefined ? blockedParcelFilter : undefined,
  };

  const {
    data: parcelsData,
    isLoading: isLoadingParcels,
    isError: isErrorParcels,
  } = useGetAllParcelsQuery({
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

  // handleStatusChange function
  const handleStatusChange = (checked: boolean, value: ParcelStatus) => {
    setStatusFilter((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((status) => status !== value);
      }
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // const handleTypeChange = (checked: boolean, value: ParcelType) => {
  //   setTypeFilter((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((type) => type !== value);
  //     }
  //   });
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  // };

  // const handleShippingTypeChange = (checked: boolean, value: ShippingType) => {
  //   setShippingTypeFilter((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((type) => type !== value);
  //     }
  //   });
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  // };

  // const handleBlockedParcelChange = (checked: boolean, value: boolean) => {
  //   setBlockedParcelFilter(checked ? value : undefined);
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  // };

  const table = useReactTable({
    data: parcelsData?.data || [],
    columns,
    // Server-side pagination configuration
    manualPagination: true,
    pageCount: parcelsData?.meta?.totalPage,
    rowCount: parcelsData?.meta?.total,

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

  if (isLoadingParcels) {
    return <Loading message="Loading parcels data..." />;
  }

  if (!isLoadingParcels && isErrorParcels) {
    return <Error />;
  }

  const content = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Filter by tracking id */}
        <div className="relative">
          <Input
            id={id}
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
          <div className="absolute -inset-y-[2px] text-muted-foreground/80">
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Search by tracking ID</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Filter by status */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Status
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
                {Object.values(ParcelStatus).map((value, i) => (
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
        </Popover>
        {/* Filter by parcel type */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Parcel Type
              {typeFilter.length > 0 && (
                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  {typeFilter.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-muted-foreground text-xs font-medium">Filters</div>
              <div className="space-y-3">
                {Object.values(ParcelType).map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`type-${i}`}
                      checked={typeFilter.includes(value)}
                      onCheckedChange={(checked: boolean) => handleTypeChange(checked, value)}
                    />
                    <Label htmlFor={`type-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover> */}
        {/* Filter by shipping type */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Shipping Type
              {shippingTypeFilter.length > 0 && (
                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  {shippingTypeFilter.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-muted-foreground text-xs font-medium">Filters</div>
              <div className="space-y-3">
                {Object.values(ShippingType).map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`shippingType-${i}`}
                      checked={shippingTypeFilter.includes(value)}
                      onCheckedChange={(checked: boolean) => handleShippingTypeChange(checked, value)}
                    />
                    <Label htmlFor={`shippingType-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover> */}
        {/* Filter by blocked parcels */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
              Blocked
              {blockedParcelFilter !== undefined && (
                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  {blockedParcelFilter ? "Yes" : "No"}
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
                      id={`blocking-${i}`}
                      checked={blockedParcelFilter === (value === "Yes")}
                      onCheckedChange={(checked: boolean) => handleBlockedParcelChange(checked, value === "Yes")}
                    />
                    <Label htmlFor={`blocking-${i}`} className="flex grow justify-between gap-2 font-normal">
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
      <div className="flex items-center gap-3  ">
        {/* Send parcel button */}
        <Button
          onClick={() => setOpen(true)}
          className="dark:bg-primary hover:bg-primary/90 text-cream-50 dark:border-primary text-white"
          variant="default"
        >
          <PlusIcon className="-ms-1 opacity-60 text-white" size={16} aria-hidden="true" />
          Create Parcel
        </Button>
        <AdminCreateParcelDialog open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );

  if (!isLoadingParcels && !isErrorParcels && parcelsData && parcelsData?.data.length === 0) {
    return (
      <>
        {content}
        <Information message="No parcel data available" />
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

function RowActions({ row }: { row: Row<IParcel> }) {
  const [open, setOpen] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const form = useForm<z.infer<typeof updateStatusPersonnelSchema>>({
    resolver: zodResolver(updateStatusPersonnelSchema),
    defaultValues: {
      currentStatus: undefined,
      currentLocation: undefined,
      deliveryPersonnelId: undefined,
    },
  });
  const [updateStatusAndPersonnel, { isLoading, isError, error }] = useUpdateStatusAndPersonnelMutation();

  // Cancel Parcel
  const handleChangeStatus = async (data: z.infer<typeof updateStatusPersonnelSchema>) => {
    try {
      console.log("Updating parcel status", data);
      await updateStatusAndPersonnel({
        id: row.original?._id,
        data: {
          ...data,
          currentStatus: data.currentStatus as ParcelStatus | undefined,
          currentLocation: data.currentLocation ? data.currentLocation : undefined,
          deliveryPersonnelId: data.deliveryPersonnelId ? data.deliveryPersonnelId : undefined,
        },
      }).unwrap();

      setOpen(false);
      toast.success("Parcel status updated successfully");
    } catch (error) {
      console.error("Failed to update parcel status", error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to update parcel status", {
        description: (error as any)?.data?.message,
      });
    }
  }, [isError, error]);

  // Block/Unblock Parcel
  const formBlock = useForm<z.infer<typeof updateBlockedStatusSchema>>({
    resolver: zodResolver(updateBlockedStatusSchema),
    defaultValues: {
      isBlocked: undefined,
      reason: undefined,
    },
  });

  const [blockParcel, { isLoading: isBlocking, isError: isBlockingError, error: blockingError }] =
    useBlockParcelMutation();
  const handleBlockUnblock = async (data: z.infer<typeof updateBlockedStatusSchema>) => {
    const { isBlocked, reason } = data;
    try {
      await blockParcel({
        id: row.original?._id,
        // @ts-ignore
        data: { isBlocked: isBlocked === "blocked", reason },
      }).unwrap();

      setOpenBlock(false);
      toast.success(`Parcel ${isBlocked === "blocked" ? "blocked" : "unblocked"} successfully`);
    } catch (error) {
      console.error("Failed to update parcel status", error);
    }
  };

  useEffect(() => {
    if (isBlockingError) {
      toast.error("Failed to update parcel status", {
        description: (blockingError as any)?.data?.message,
      });
    }
  }, [isBlockingError, blockingError]);

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
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={`/admin/${row.original?._id}/details`}>
              <span>View Details</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <span>Change Status</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Status</DialogTitle>
                <DialogDescription>
                  Are you sure you want to change the status of parcel {row.original?.trackingId}?
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleChangeStatus)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentStatus"
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
                            {Object.values(ParcelStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter current location" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryPersonnelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign Delivery Personnel</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter delivery personnel ID" {...field} />
                        </FormControl>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog open={openBlock} onOpenChange={setOpenBlock}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <span>Block / Unblock</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Block Status</DialogTitle>
                <DialogDescription>Are you sure you want to block/unblock parcel?</DialogDescription>
              </DialogHeader>
              <Form {...formBlock}>
                <form onSubmit={formBlock.handleSubmit(handleBlockUnblock)} className="space-y-4">
                  <FormField
                    control={formBlock.control}
                    name="isBlocked"
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
                            <SelectItem value="unblock">Unblock</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formBlock.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason (if blocking)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter reason" {...field} value={field.value ?? ""} />
                        </FormControl>
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
                      {isBlocking ? "Updating..." : "Update"}
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
