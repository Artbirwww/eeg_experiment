// src/utils/csvLogger.ts
export interface LogEntry {
  time: number;
  selection: string;
}

class CSVLogger {
  private logs: LogEntry[] = [];
  private startTime: number = 0;
  private isActive: boolean = false;

  start() {
    this.logs = [];
    this.startTime = performance.now();
    this.isActive = true;
    console.log('CSVLogger started');
  }

  stop() {
    this.isActive = false;
    console.log('CSVLogger stopped');
  }

  log(selection: string) {
    if (!this.isActive) return;
    const currentTime = Math.floor(performance.now() - this.startTime);
    this.logs.push({ time: currentTime, selection });
    console.log(`Logged: ${currentTime}ms - ${selection}`);
  }

  download(filename: string) {
    const csvRows: string[] = ['time_ms,selection'];
    
    for (const log of this.logs) {
      csvRows.push(`${log.time},${log.selection}`);
    }
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    console.log('CSV downloaded:', filename, `Total entries: ${this.logs.length}`);
  }

  clear() {
    this.logs = [];
    console.log('CSVLogger cleared');
  }

  getLogs() {
    return this.logs;
  }
}

export const csvLogger = new CSVLogger();