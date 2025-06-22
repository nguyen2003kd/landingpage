"use client"
import React, { useState } from 'react';
import LeftSidebar from '@/src/app/lib/layout/LeftSidebar';
import Header from '@/src/app/lib/layout/Header';
// import NavigationTabs from './components/NavigationTabs';
import MainContent from '@/src/app/lib/layout/MainContent';
import RightPanel from '@/src/app/lib/layout/RightPanel';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [selectdpanel,setSelectpanel]=useState(false)
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      {/* <NavigationTabs /> */}
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar />
        
        {/* Main Content */}
        <MainContent />
        
        {/* Right Panel */}
        {selectdpanel ? (
          <RightPanel setSelectpanel={setSelectpanel} />
        ) : (
          <div className="fixed top-[50%] right-0 bg-white/80">
            <ArrowLeft onClick={() => setSelectpanel(true)} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;