type CanvasItemProps = {
  children?: React.ReactNode;
  x: number;
  y: number;
  className?: string;
};

const CanvasItem = ({ children, x, y, className }: CanvasItemProps) => {
  return <div className={className}>{children}</div>;
};

export default CanvasItem;
