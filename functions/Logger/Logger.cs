using System;
using System.Collections.Generic;
using Google.Api;
using Google.Cloud.Logging.Type;
using Google.Cloud.Logging.V2;

namespace Logger {
    public static class Logger {
        private static readonly string s_projectId = "oraxchain";

        public static void WriteLogEntry(string logId, string message) {
            var client = LoggingServiceV2Client.Create();
            var logName = new LogName(s_projectId, logId);
            var logEntry = new LogEntry {
                LogName = logName.ToString(),
                Severity = LogSeverity.Info,
                TextPayload = $"{typeof(Logger).FullName} - {message}"
            };
            var resource = new MonitoredResource {Type = "global"};
            IDictionary<string, string> entryLabels = new Dictionary<string, string> {
                {"size", "large"},
                {"color", "red"}
            };
            client.WriteLogEntries("Logger", resource, entryLabels,
                new[] {logEntry});
            Console.WriteLine($"Created log entry in log-id: {logId}.");
        }
    }
}