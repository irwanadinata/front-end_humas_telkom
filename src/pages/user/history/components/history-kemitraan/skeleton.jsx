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
          <Skeleton className="h-6 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-3 w-24" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default SkeletonTable;
