import React, { useState } from 'react';

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');
  
  const tabs = [
    { id: 'Home', label: 'Home' },
    { id: 'Thiep-moi', label: 'Thiếp mời' },
    { id: 'Timeline', label: 'Timeline' },
    { id: 'Tham-gia', label: 'Tham gia' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 text-sm font-medium border-b-2 transition-all duration-200 hover:text-blue-600 ${
              activeTab === tab.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:border-blue-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;