import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('font-body text-foreground/90', {
  variants: {
    size: {
      default: 'text-base leading-relaxed',
      sm: 'text-sm leading-snug',
      lg: 'text-lg leading-relaxed',
      xl: 'text-xl leading-relaxed',
    },
    weight: {
      default: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    muted: {
      true: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'default',
    weight: 'default',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, muted, as = 'p', ...props }, ref) => {
    const Comp = as;
    return (
      <Comp ref={ref} className={cn(textVariants({ size, weight, muted, className }))} {...props} />
    );
  }
);
Text.displayName = 'Text';

export { Text, textVariants };
