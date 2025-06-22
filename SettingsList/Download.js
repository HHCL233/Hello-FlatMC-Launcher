import { invoke } from "/node_modules/@tauri-apps/api/dist/tauri.min.js";

export async function downloadToRelativePath(ver, url) {
  const savePath = "C:/downloadmc";

  try {
    DownloadOK(`版本 ${ver} 开始下载`);
    await invoke("download_file", {
      url: url,
      savePath: savePath,
    });
    DownloadOK(`版本 ${ver} 下载完成`);
  } catch (error) {
    DownloadOK(`版本 ${ver} 下载失败`);
    console.error("详细错误:", error);
  }
}
window.downloadToRelativePath = downloadToRelativePath;


