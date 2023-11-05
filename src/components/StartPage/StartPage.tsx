export const StartPage: React.FC = () => {
  return (
    <div className="start-page">
      <header className="start-page__header">
        <h1 className="start-page__title">Welcome to our chat application!</h1>
        <p className="start-page__description">
          Learn more about the features of our app.
        </p>
      </header>

      <div className="start-page__feature-container">
        <section className="feature start-page__feature">
          <h2 className="feature__title">Feature 1: Create Rooms</h2>
          <p className="feature__description">
            With our app, you can create
            your own rooms to chat with other users.
          </p>
        </section>

        <section className="feature start-page__feature">
          <h2 className="feature__title">Feature 2: Edit and Delete Rooms</h2>
          <p className="feature__description">
            Room owners can rename or
            delete their rooms to manage the community.
          </p>
        </section>

        <section className="feature start-page__feature">
          <h2 className="feature__title">Feature 3: Convenient Chat</h2>
          <p className="feature__description">
            Our app provides convenient tools for real-time communication and
            message exchange.
          </p>
        </section>

        <section className="feature start-page__feature">
          <h2 className="feature__title">Feature 4: Start Chatting</h2>
          <p className="feature__description">
            To start chatting, simply select
            a chat room and begin your conversation.
          </p>
        </section>
      </div>

      <footer className="start-page__footer">
        <p className="start-page__footer-text">
          Thank you for your interest in our chat application. Enjoy chatting
          and creating rooms!
        </p>
      </footer>

    </div>
  );
};
