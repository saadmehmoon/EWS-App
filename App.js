import React, { useEffect } from "react";

import Navigation from "./src/navigation/Navigation";
import { notificationListener, requestUserPermission } from "./src/notifications";

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  return <Navigation />;
};

export default App;
