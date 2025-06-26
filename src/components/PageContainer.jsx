// components/PageContainer.jsx
const PageContainer = ({ children }) => {
  return (
    <div
      className="flex-1 w-full"
      style={{
        minHeight: 'calc(100vh - var(--navbar-height) - var(--footer-height))',
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
