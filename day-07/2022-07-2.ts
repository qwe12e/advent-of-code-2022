const commands = (await Deno.readTextFile("./terminal-output.txt")).split("\n");

class Folder {
  parentFolder?: Folder;
  folderSize = 0;

  files: File[] = [];
  folders: Folder[] = [];

  constructor(public folderName: string) {}

  addAFile({ fileName, fileSize }: { fileName: string; fileSize: number }) {
    const createdFile = new File(fileName, fileSize);
    this.files.push(createdFile);
    this.updateFolderSize(fileSize);
    return createdFile;
  }

  addAFolder(folderName: string) {
    const createdFolder = new Folder(folderName);
    createdFolder.parentFolder = this;
    this.folders.push(createdFolder);
    return createdFolder;
  }

  updateFolderSize(size: number) {
    this.folderSize += size;
    this.parentFolder?.updateFolderSize(size);
  }

  getFolder(folderName: string) {
    return this.folders.find((folder) => folder.folderName === folderName);
  }
}

class File {
  constructor(public fileName: string, public fileSize: number) {}
}

const rootFolder = new Folder("/");
const allFolders: Folder[] = [rootFolder];

let currentFolder = rootFolder;
for (const command of commands) {
  const [first, second, third] = command.split(" ");

  switch (first) {
    case "$": {
      switch (second) {
        case "cd": {
          if (third === "..") {
            currentFolder = currentFolder.parentFolder!;
          } else if (third === "/") {
            currentFolder = rootFolder;
          } else {
            currentFolder = currentFolder.getFolder(third)!;
          }
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    case "dir": {
      const createdFolder = currentFolder.addAFolder(second);
      allFolders.push(createdFolder);
      break;
    }
    default: {
      currentFolder.addAFile({
        fileName: second,
        fileSize: +first,
      });
      break;
    }
  }
}

const TOTAL_DISK_SPACE = 70000000;
const UPDATE_SPACE = 30000000;

const usedSpace = TOTAL_DISK_SPACE - rootFolder.folderSize;

const totalSizeToBeDeleted = UPDATE_SPACE - usedSpace;
const folderToBeDeleted = allFolders
  .slice()
  .sort((a, b) => a.folderSize - b.folderSize)
  .find((size) => size.folderSize >= totalSizeToBeDeleted);

console.log({ folderToBeDeletedSize: folderToBeDeleted?.folderSize });
