export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-800 p-8">
      <h1 className="text-2xl font-bold mb-4">Thrive Tribe Home</h1>
      <p className="mb-4">Welcome to Thrive Tribe! This is a simplified page to help diagnose loading issues.</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Available Pages:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <a href="/login" className="text-blue-500 hover:underline">Login Page</a>
          </li>
          <li>
            <a href="/signup" className="text-blue-500 hover:underline">Signup Page</a>
          </li>
          <li>
            <a href="/library" className="text-blue-500 hover:underline">Mental Health Library</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
