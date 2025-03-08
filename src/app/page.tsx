export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to Task Manager
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            Stay organized, track your progress, and boost your productivity
            with our task management app.
          </p>
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Get Started
          </a>
        </section>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Easy Task Management</h3>
            <p className="text-gray-600">
              Quickly create, update, and delete tasks.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Organize by Status</h3>
            <p className="text-gray-600">
              Group your tasks by status to keep your workflow clear.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Account Support</h3>
            <p className="text-gray-600">
              Access your tasks from anywhere by creating an account and logging in.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
