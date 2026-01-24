import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('font-bold leading-tight text-foreground', {
  variants: {
    size: {
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-2xl md:text-3xl',
      h4: 'text-xl md:text-2xl',
      h5: 'text-lg md:text-xl',
      h6: 'text-base md:text-lg',
    },
  },
  defaultVariants: {
    size: 'h1',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as = 'h1', ...props }, ref) => {
    const Comp = as;
    // Map 'as' prop to size if size is not provided, otherwise use size prop or default
    const variantSize = size || as;

    // Apply Bebas Neue (font-display) for H1, H2, H3; standard heading font for others
    const fontClass = ['h1', 'h2', 'h3'].includes(as) ? 'font-display' : 'font-heading';

    return (
      <Comp
        ref={ref}
        className={cn(fontClass, headingVariants({ size: variantSize, className }))}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
