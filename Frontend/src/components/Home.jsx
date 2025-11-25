import { Link } from "react-router-dom";
import { FaUserFriends, FaChartLine, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center bg-base-100">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-base-100 opacity-50 z-0"></div>
        <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Your <br />
              <span className="text-gradient">Assignments</span> Together
            </h1>
            <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto lg:mx-0">
              The ultimate platform for collaborative learning. Share, review, and improve your assignments with a community of peers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/allassignment" className="btn btn-primary btn-lg shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                Explore Assignments
              </Link>
              <a href="#features" className="btn btn-ghost btn-lg hover:bg-base-200">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30 blur-3xl animate-pulse"></div>
            <img
              src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
              alt="Hero"
              className="relative w-full max-w-lg mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-base-200 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AssignmentHub?</h2>
            <p className="text-base-content/60">Unlock your potential with features designed to boost your learning journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-3xl text-primary">
                <FaUserFriends />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Support</h3>
              <p className="text-base-content/70">
                Connect with friends and peers. Get help when you're stuck and share your knowledge to help others.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-3xl text-secondary">
                <FaChartLine />
              </div>
              <h3 className="text-2xl font-bold mb-4">Track Progress</h3>
              <p className="text-base-content/70">
                Monitor your improvement over time. Receive constructive feedback and grades from the community.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-3xl text-accent">
                <FaShieldAlt />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
              <p className="text-base-content/70">
                Your data is safe with us. Focus on learning without worrying about privacy or security leaks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="collapse collapse-arrow bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                How can I create an assignment?
              </div>
              <div className="collapse-content text-base-content/80">
                <p>Navigate to "Create Assignment" in the navbar, fill out the form with your question and details, and click submit.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Is this platform free?
              </div>
              <div className="collapse-content text-base-content/80">
                <p>Yes! AssignmentHub is completely free to use for all students and learners.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                How does grading work?
              </div>
              <div className="collapse-content text-base-content/80">
                <p>Your assignments are reviewed by peers. They provide marks and feedback based on the quality of your work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;