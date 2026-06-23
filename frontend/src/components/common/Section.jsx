export default function Section({ children, className = "" }) {
  return (
    <section className={`bg-neutral-light py-[60px] ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        {children}
      </div>
    </section>
  );
}