# Handling Time-Based Loan Defaults in Subgraphs

## Problem
Loans default after a certain duration (`createdAt + duration`), but there's no on-chain event emitted when this happens. The subgraph needs a way to mark loans as defaulted based on time calculations.

## Solutions

### 1. Schema-Based Approach (Recommended)

Add a computed field to store the default deadline:

```graphql
type Loan @entity(immutable: false) {
  # ... existing fields ...
  defaultDeadline: BigInt!  # createdAt + duration
  # ... rest of fields ...
}
```

**Advantages:**
- Easy to query loans by default status
- Efficient for frontend filtering
- Clear data model

**Implementation:**
1. Add `defaultDeadline` field to schema
2. Run `npm run codegen` to regenerate types
3. Update `handleLOANCreated` to calculate and store `defaultDeadline`

### 2. Runtime Status Checking (Current Implementation)

Use helper functions to check loan status based on current time:

```typescript
function isLoanDefaulted(loan: Loan, currentTimestamp: BigInt): boolean {
  if (loan.status != "Active") return false;
  const defaultDeadline = loan.createdAt.plus(loan.duration);
  return currentTimestamp.gt(defaultDeadline);
}
```

**Advantages:**
- No schema changes required
- Works immediately
- Can be applied to existing loans

**Disadvantages:**
- Requires checking on every query
- More complex GraphQL queries needed

### 3. Event-Driven Updates

Update loan statuses whenever any related event occurs:

```typescript
export function handleLOANClaimed(event: LOANClaimed): void {
  // ... existing logic ...
  
  // Always check for time-based defaults
  updateLoanStatusIfDefaulted(loan, event.block.timestamp);
  loan.save();
}
```

### 4. Query-Time Filtering

Use GraphQL queries that filter based on calculated values:

```graphql
query GetDefaultedLoans($currentTime: BigInt!) {
  loans(
    where: {
      status: "Active"
      # This would need to be calculated client-side or with a custom resolver
    }
  ) {
    id
    createdAt
    duration
    status
  }
}
```

## Frontend Usage Examples

### 1. Query with Status Calculation

```typescript
const GET_LOANS_WITH_STATUS = gql`
  query GetLoans {
    loans {
      id
      createdAt
      duration
      status
      defaultDeadline  # If using schema approach
    }
  }
`;

// Client-side calculation
const loansWithCalculatedStatus = loans.map(loan => ({
  ...loan,
  isDefaulted: loan.status === 'Active' && 
    Date.now() / 1000 > (loan.createdAt + loan.duration),
  effectiveStatus: loan.status === 'Active' && 
    Date.now() / 1000 > (loan.createdAt + loan.duration) 
    ? 'Defaulted' : loan.status
}));
```

### 2. Filter Defaulted Loans

```typescript
// If using defaultDeadline field
const GET_DEFAULTED_LOANS = gql`
  query GetDefaultedLoans($currentTime: BigInt!) {
    loans(
      where: {
        or: [
          { status: "Defaulted" },
          { 
            status: "Active",
            defaultDeadline_lt: $currentTime
          }
        ]
      }
    ) {
      id
      status
      defaultDeadline
    }
  }
`;
```

## Implementation Steps

1. **Choose Your Approach:**
   - For new projects: Use Schema-Based Approach (#1)
   - For existing projects: Use Runtime Status Checking (#2)

2. **Update Schema (if using approach #1):**
   ```bash
   # Add defaultDeadline field to schema.graphql
   npm run codegen
   ```

3. **Update Event Handlers:**
   - Implement time-based status checking
   - Update `handleLOANCreated`, `handleLOANClaimed`, etc.

4. **Frontend Integration:**
   - Update queries to handle time-based defaults
   - Add client-side status calculation if needed

## Best Practices

1. **Consistency:** Always check for time-based defaults in all loan-related event handlers
2. **Performance:** Use schema fields for frequently queried data
3. **Accuracy:** Consider block timestamps vs real-world time
4. **Extensions:** Handle loan extensions by updating duration/defaultDeadline
5. **Testing:** Test with various time scenarios

## Alternative Solutions

### Custom Resolver (Advanced)
Create a custom resolver that calculates status dynamically:

```typescript
// This would require extending the subgraph with custom logic
export function resolveLoanStatus(loan: Loan, args: any, context: any): string {
  if (loan.status !== "Active") return loan.status;
  
  const currentTime = context.block.timestamp;
  const defaultDeadline = loan.createdAt.plus(loan.duration);
  
  return currentTime.gt(defaultDeadline) ? "Defaulted" : "Active";
}
```

### Periodic Update Job
Create a separate service that periodically updates loan statuses:

```typescript
// External service (not in subgraph)
async function updateDefaultedLoans() {
  const activeLoans = await getActiveLoans();
  const currentTime = Math.floor(Date.now() / 1000);
  
  for (const loan of activeLoans) {
    if (currentTime > loan.createdAt + loan.duration) {
      // Update loan status in subgraph or database
      await markLoanAsDefaulted(loan.id);
    }
  }
}
```

## Conclusion

The **Schema-Based Approach** with `defaultDeadline` field is recommended for most cases as it provides the best balance of performance, clarity, and functionality. The current implementation with runtime checking works well as a transitional solution. 