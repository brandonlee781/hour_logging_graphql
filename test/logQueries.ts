export const allLogsQuery = `
{
  allLogs{
    id,
    date,
    startTime,
    endTime,
    duration,
    project {
      id,
      name
    },
    note
  }
}
`;