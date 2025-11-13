import React from 'react';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.HTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`block text-sm font-medium text-muted-foreground ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
