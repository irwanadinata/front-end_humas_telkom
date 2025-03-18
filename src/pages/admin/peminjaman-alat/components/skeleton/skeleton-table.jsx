import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const SkeletonTable = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Skeleton className="h-5 w-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-22" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-22" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-22" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-22" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-22" />
        </TableCell>  
        <TableCell>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default SkeletonTable;