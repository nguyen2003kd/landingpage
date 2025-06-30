import React from 'react';
import { useElementStore } from '@/src/store/elementStore';

const SettingsPanel: React.FC = () => {
  const { elements, selectedElementId, updateElement, deleteElement } = useElementStore();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
        <p className="text-gray-500">Select an element to edit its properties</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (selectedElementId) {
      deleteElement(selectedElementId);
    }
  };

  const renderTextSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={selectedElement.props.content || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, content: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
        <input
          type="number"
          value={selectedElement.props.fontSize || 16}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, fontSize: parseInt(e.target.value) } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <input
          type="color"
          value={selectedElement.props.color || '#000000'}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, color: e.target.value } })}
          className="w-full h-10 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );

  const renderButtonSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
        <input
          type="text"
          value={selectedElement.props.text || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, text: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
        <input
          type="text"
          value={selectedElement.props.link || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, link: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
        <select
          value={selectedElement.props.variant || 'primary'}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, variant: e.target.value as string } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
        </select>
      </div>
    </div>
  );

  const renderImageSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          value={selectedElement.props.src || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, src: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
        <input
          type="text"
          value={selectedElement.props.alt || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, alt: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
const renderHearderdefault =()=>(
  <div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
    <input
      type="text"
      value={selectedElement.props.src || ''}
      onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, src: e.target.value } })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
    <input
      type="text"
      value={selectedElement.props.alt || ''}
      onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, alt: e.target.value } })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>
)
  const renderCardSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={selectedElement.props.title || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, title: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={selectedElement.props.description || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, description: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          value={selectedElement.props.imageUrl || ''}
          onChange={(e) => updateElement(selectedElementId!, { props: { ...selectedElement.props, imageUrl: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderSettings = () => {
    switch (selectedElement.type) {
      case 'text':
        return renderTextSettings();
      case 'button':
        return renderButtonSettings();
      case 'image':
        return renderImageSettings();
      case 'card':
        return renderCardSettings();
      case 'header':
        return renderHearderdefault();
      default:
        return <p className="text-gray-500">No settings available for this element type</p>;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
        >
          Delete
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Element Type: {selectedElement.type}</p>
        <p className="text-sm text-gray-500">ID: {selectedElement.id}</p>
      </div>

      {renderSettings()}
    </div>
  );
};

export default SettingsPanel; 