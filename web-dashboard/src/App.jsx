import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Placeholder Pages
import HerdOverview from './pages/HerdOverview';
import LiveCamelMap from './pages/LiveCamelMap';
import AIRiskHeatmap from './pages/AIRiskHeatmap';
import RedatIntelligence from './pages/RedatIntelligence';
import CommunityKnowledgeMap from './pages/CommunityKnowledgeMap';
import PredictiveAnalytics from './pages/PredictiveAnalytics';
import AlertCenter from './pages/AlertCenter';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><HerdOverview /></AppLayout>} />
        <Route path="/live-map" element={<AppLayout><LiveCamelMap /></AppLayout>} />
        <Route path="/ai-heatmap" element={<AppLayout><AIRiskHeatmap /></AppLayout>} />
        <Route path="/intelligence" element={<AppLayout><RedatIntelligence /></AppLayout>} />
        <Route path="/community-map" element={<AppLayout><CommunityKnowledgeMap /></AppLayout>} />
        <Route path="/predictive" element={<AppLayout><PredictiveAnalytics /></AppLayout>} />
        <Route path="/alerts" element={<AppLayout><AlertCenter /></AppLayout>} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
