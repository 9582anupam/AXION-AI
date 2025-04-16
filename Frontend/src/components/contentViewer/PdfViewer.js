import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

const PdfViewer = ({ fileUrl }) => {
    // Initialize the zoom plugin for PDFs

    const zoomPluginInstance = zoomPlugin();
    const { ZoomIn, ZoomOut, ZoomPopover } = zoomPluginInstance;

    const handleScrollZoom = (event) => {
        if (event.deltaY < 0) {
            zoomPluginInstance.ZoomIn();
        } else if (event.deltaY > 0) {
            zoomPluginInstance.ZoomOut();
        }
    };

    return (
        < >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                <div className="pdf-toolbar flex p-4 mt-12 justify-evenly">
                    <ZoomOut />
                    <ZoomPopover />
                    <ZoomIn />
                </div>
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[zoomPluginInstance]}
                    defaultScale={SpecialZoomLevel.PageWidth}
                    onWheel={handleScrollZoom}
                    className="pdfViewer"
                />
            </Worker>
        </>
    );
};

export default PdfViewer;
