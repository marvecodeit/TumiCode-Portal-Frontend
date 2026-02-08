import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error details to a service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI instead of blank screen
      return (
        <div style={{ padding: "20px", background: "#fee", borderRadius: "8px" }}>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing or editing your post again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;