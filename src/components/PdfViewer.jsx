import { Document, Page, pdfjs } from 'react-pdf';
import { useFormStore } from '../store/useFormStore';
import { mockFields } from '../data/mockSchema';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

export default function PdfViewer() {
  const focusedFieldId = useFormStore((state) => state.focusedFieldId);

  return (
    <div
      style={{
        position: 'relative',
        width: 'fit-content',
      }}
    >
      {/* PDF */}
      <Document file="/sample.pdf">
        <Page pageNumber={1} width={600} />
      </Document>

      {/* Overlay */}
      {mockFields.map((field) => {
        const isFocused = field.id === focusedFieldId;

        return (
          <div
            key={field.id}
            style={{
              position: 'absolute',
              left: `${field.x}px`,
              top: `${field.y}px`,
              width: `${field.width}px`,
              height: `${field.height}px`,
              border: isFocused ? '3px solid red' : '1px solid transparent',
              backgroundColor: isFocused ? 'rgba(255,0,0,0.3)' : 'transparent',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
}
