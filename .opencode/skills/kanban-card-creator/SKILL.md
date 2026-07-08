---
name: kanban-card-creator
description: Use when the user asks to create, add, queue, or put a task/card into this VS Code Kanban extension's todo list, including phrases like “创建卡片”, “加到 todo”, “放入待办”, “新增任务卡”, “add a kanban card”, or “put this in the todo list”. This skill creates cards that match the repository's .kanban/board.json schema.
---

# Kanban Card Creator

Use this skill to turn a user's request into one or more valid task cards for this repository's VS Code Kanban extension and append them to the project's todo list.

## What To Modify

The project board lives at:

```text
.kanban/board.json
```

The file uses this V1 wrapper:

```json
{
  "schemaVersion": 1,
  "fileType": "kanban.board",
  "meta": {
    "updatedAt": 1781359991130,
    "revision": 7
  },
  "boardState": {
    "cards": [],
    "sessions": []
  }
}
```

Only append new card objects to `boardState.cards`. Do not create sessions for new todo cards.

## Card Shape

Create each card with these fields:

```json
{
  "id": "unique-id",
  "title": "short actionable title",
  "priority": "p4",
  "summary": "clear implementation request or task details",
  "status": "todo",
  "workflowMode": "default",
  "createdAt": 1781359991130,
  "updatedAt": 1781359991130,
  "running": false,
  "compacting": false,
  "lastRunDurationMs": 0
}
```

Required field rules:

- `id`: generate a unique lowercase id. Prefer `Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9)` when scripting.
- `title`: concise, user-facing, usually 4-12 Chinese characters or 3-8 English words.
- `priority`: one of `p1` through `p7`; lower number means higher priority. Default to `p4` unless the user specifies urgency.
- `summary`: preserve the user's actual requirement with enough detail for an agent to execute the card later.
- `status`: always `todo` for newly queued cards.
- `workflowMode`: use `openspec` only when the user explicitly asks for OpenSpec/proposal/spec workflow; otherwise use `default`.
- `createdAt` and `updatedAt`: same current epoch milliseconds value.
- `running`: always `false` for new todo cards.

Do not add active-run fields such as `sessionId`, `opencodeSessionId`, `activeMessageID`, `activeRunMode`, `runningStartedAt`, `lastError`, or `failureReason` to fresh todo cards.

## Workflow

1. Read `.kanban/board.json` first if it exists.
2. If the file is missing, create the V1 wrapper shown above with empty `cards` and `sessions`.
3. Extract one or more cards from the user's request.
4. Ask one short clarification only when the request lacks enough information to create a useful card. If the request is understandable, proceed without asking.
5. Append cards to `boardState.cards` without removing, reordering, or rewriting existing cards beyond normal JSON formatting.
6. Increment `meta.revision` by 1 for the file update, or set it to `1` for a new file.
7. Set `meta.updatedAt` to the same current timestamp used for the new cards' `updatedAt`.
8. After editing, verify the JSON parses and every new card has `status: "todo"`.
9. Tell the user which cards were added and their priorities.

## Priority Mapping

Use this mapping unless the user gives an explicit priority:

- `p1`: production outage, data loss, security issue, blocking all work.
- `p2`: urgent bug or release blocker.
- `p3`: important user-visible feature or important bug.
- `p4`: normal feature, refactor, documentation, or unspecified task.
- `p5`: nice-to-have improvement.
- `p6`: low-priority cleanup.
- `p7`: someday/backlog idea.

## Title And Summary Guidance

Prefer action-oriented titles:

- Good: `修复卡片刷新`, `Add archive filter`, `完善错误提示`
- Bad: `问题`, `TODO`, `用户说的需求`

The summary should be complete enough that a later run can execute it without reading the original chat. Include constraints, target files, acceptance criteria, and user-provided wording when available.

## Examples

Input:

```text
把“修复归档卡片刷新后丢失 review 按钮”加到 todo，优先级高一点
```

Card:

```json
{
  "title": "修复归档 review 按钮",
  "priority": "p3",
  "summary": "修复归档卡片在刷新后丢失 review 按钮的问题，确保刷新前后操作入口一致。",
  "status": "todo",
  "workflowMode": "default"
}
```

Input:

```text
创建两个卡片：1. 增加卡片搜索；2. 清理过期 debug 日志
```

Cards:

```json
[
  {
    "title": "增加卡片搜索",
    "priority": "p4",
    "summary": "为看板卡片增加搜索能力，支持按标题和摘要过滤。",
    "status": "todo",
    "workflowMode": "default"
  },
  {
    "title": "清理 debug 日志",
    "priority": "p6",
    "summary": "清理项目中过期或无用的 debug 日志，保留必要诊断信息。",
    "status": "todo",
    "workflowMode": "default"
  }
]
```

## Safety Checks

- Preserve existing cards and sessions.
- Do not mark new cards as running, failed, in review, done, or archived.
- Do not edit `.kanban/sessions/` for plain todo card creation.
- Do not run the card automatically unless the user explicitly asks to run it.
- If another card is currently running, still adding a `todo` card is safe because it only queues future work.
