# Implementation Plan

Fix database schema mismatch error in HeroSection block by converting from nested group structure to flat field structure.

## [Overview]

Convert HeroSection block configuration from nested group fields to flat fields to match the database schema expectations and resolve the query error.

The error occurs because the database expects flat field names like `cta_primary_label`, `cta_primary_url`, `cta_secondary_label`, `cta_secondary_phone` but the current block configuration uses nested groups that create JSON columns instead.

## [Types]

Update TypeScript interfaces to use flat field structure instead of nested groups.

**Current nested structure:**

```typescript
ctaPrimary?: {
  label?: string | null;
  url?: string | null;
};
ctaSecondary?: {
  label?: string | null;
  phone?: string | null;
};
```

**New flat structure:**

```typescript
ctaPrimaryLabel?: string | null;
ctaPrimaryUrl?: string | null;
ctaSecondaryLabel?: string | null;
ctaSecondaryPhone?: string | null;
```

## [Files]

Modify existing files to implement flat field structure.

**Files to modify:**

- `src/blocks/HeroSection/config.ts` - Convert group fields to individual flat fields
- `src/blocks/HeroSection/Component.tsx` - Update component to use flat field names
- `src/payload-types.ts` - Will be regenerated automatically after config changes

**No new files needed** - this is a configuration change to existing block structure.

## [Functions]

Update component rendering logic to use flat field names.

**Modified functions:**

- HeroSection Component in `src/blocks/HeroSection/Component.tsx`
  - Update destructuring to use flat field names
  - Update JSX to reference flat fields instead of nested objects
  - Maintain same functionality with new field structure

**No functions removed** - only field access patterns change.

## [Classes]

No class modifications required - this is a field structure change only.

The HeroSection block uses functional components, not classes.

## [Dependencies]

No new dependencies required.

This is a configuration change that works within the existing Payload CMS and Next.js framework.

## [Testing]

Verify the fix resolves the database query error.

**Test approach:**

- Start development server after changes
- Navigate to home page (slug: 'home')
- Confirm no database query errors in console
- Verify HeroSection block renders correctly
- Test that CTA buttons work with new field structure

## [Implementation Order]

Execute changes in logical sequence to minimize conflicts.

1. **Update HeroSection block configuration** - Convert nested groups to flat fields
2. **Update HeroSection component** - Modify to use flat field names
3. **Regenerate TypeScript types** - Run payload generate:types command
4. **Reset database schema** - Clear and recreate tables with correct structure
5. **Test the application** - Verify error is resolved and functionality works
6. **Validate all HeroSection features** - Ensure CTA buttons and content display correctly
