import { useEffect } from 'react';
import { useFormStore } from './store/useFormStore';
import { mockFields } from './data/mockSchema';
import PdfViewer from './components/pdfViewer';
import DynamicForm from './components/DynamicForm';

export default function App() {
  const setFields = useFormStore((s) => s.setFields);

  useEffect(() => {
    setFields(mockFields);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
      }}
    >
      <div style={{ overflow: 'auto', borderRight: '1px solid #ccc' }}>
        <PdfViewer />
      </div>
      <div style={{ overflow: 'auto' }}>
        <DynamicForm />
      </div>
    </div>
  );
}
