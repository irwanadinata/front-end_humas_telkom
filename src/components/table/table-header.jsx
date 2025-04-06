function TableHeader({heading}) {
    return (
      <>
        <div className="flex h-16 px-8 gap-3 items-center border-b-[1px]">
          <h3 className="text-lg font-bold text-[#000000]">{heading}</h3>
        </div>
      </>
    );
  }
  
  export default TableHeader;