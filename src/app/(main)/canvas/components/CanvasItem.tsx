type CanvasItemProps = {
  children?: React.ReactNode;
  x: number;
  y: number;
  className?: string;
  id?: string;
};

const CanvasItem = ({ children, x, y, className, id }: CanvasItemProps) => {
  return (
    <div
      className={`absolute left-0 top-0 ${className || ""}`}
      id={id}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default CanvasItem;
