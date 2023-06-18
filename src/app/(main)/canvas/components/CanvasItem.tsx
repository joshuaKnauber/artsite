type CanvasItemProps = {
  children?: React.ReactNode;
  x: number;
  y: number;
  className?: string;
};

const CanvasItem = ({ children, x, y, className }: CanvasItemProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default CanvasItem;
