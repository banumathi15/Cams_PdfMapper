import { useState } from 'react';
import { useFormStore } from '../store/useFormStore';
import { formSchema } from '../utils/validation';

export default function DynamicForm() {
  const { fields, updateField, setFocusedField } = useFormStore();
  const [errors, setErrors] = useState({});
  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const clearError = (fieldId) => {
    setErrors((prev) => ({
      ...prev,
      [fieldId]: '',
    }));
  };

  const handleSubmit = () => {
    const formData = {};
    fields.forEach((field) => {
      formData[field.id] = field.value;
    });

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      alert('Form submitted successfully!');
      console.log(result.data);
    }
  };

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
      }}
    >
      <h2
        style={{
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
        }}
      >
        Extracted Form
      </h2>

      {fields.map((field) => (
        <div key={field.id} style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              textAlign: 'left',
            }}
          >
            {field.label}
          </label>

          {/* TEXT */}
          {field.type === 'text' && (
            <input
              value={field.value}
              onFocus={() => setFocusedField(field.id)}
              onChange={(e) => {
                updateField(field.id, e.target.value);
                clearError(field.id);
              }}
              style={inputStyle}
            />
          )}

          {/* NUMBER */}
          {field.type === 'number' && (
            <input
              type="number"
              value={field.value}
              onFocus={() => setFocusedField(field.id)}
              onChange={(e) => {
                updateField(field.id, e.target.value);
                clearError(field.id);
              }}
              style={inputStyle}
            />
          )}

          {/* DATE */}
          {field.type === 'date' && (
            <input
              type="date"
              value={field.value}
              onFocus={() => setFocusedField(field.id)}
              onChange={(e) => {
                updateField(field.id, e.target.value);
                clearError(field.id);
              }}
              style={inputStyle}
            />
          )}

          {/* EMAIL */}
          {field.type === 'email' && (
            <input
              type="email"
              value={field.value}
              onFocus={() => setFocusedField(field.id)}
              onChange={(e) => {
                updateField(field.id, e.target.value);
                clearError(field.id);
              }}
              style={inputStyle}
            />
          )}

          {/* PHONE */}
          {field.type === 'tel' && (
            <input
              type="tel"
              value={field.value}
              onFocus={() => setFocusedField(field.id)}
              onChange={(e) => {
                updateField(field.id, e.target.value);
                clearError(field.id);
              }}
              style={inputStyle}
            />
          )}

          {/* CHECKBOX */}
          {field.type === 'checkbox' && (
            <div style={{ textAlign: 'left' }}>
              <input
                type="checkbox"
                checked={field.value}
                onFocus={() => setFocusedField(field.id)}
                onChange={(e) => {
                  updateField(field.id, e.target.checked);
                  clearError(field.id);
                }}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                }}
              />
            </div>
          )}

          {/* ERROR */}
          {errors[field.id] && (
            <p
              style={{
                color: '#dc2626',
                fontSize: '12px',
                marginTop: '6px',
                textAlign: 'left',
              }}
            >
              {errors[field.id]}
            </p>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px',
          background: '#111827',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: '0.2s',
        }}
      >
        Submit Form
      </button>
    </div>
  );
}
