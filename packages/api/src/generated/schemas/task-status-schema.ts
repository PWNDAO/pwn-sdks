/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { TaskStatusSchemaScheduled } from "./task-status-schema-scheduled";
import type { TaskStatusSchemaSkipped } from "./task-status-schema-skipped";

export interface TaskStatusSchema {
	scheduled?: TaskStatusSchemaScheduled;
	skipped?: TaskStatusSchemaSkipped;
}
