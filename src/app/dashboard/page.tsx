import TaskList from "@/app/components/TaskList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {
  const { getAccessToken, isAuthenticated } = getKindeServerSession();
  // console.log(await getAccessToken());
  const auth = await isAuthenticated();
  return (
    <div className="container">
      <div className="card start-hero">
        <p className="text-body-2 start-hero-intro">Woohoo!</p>
        <p className="text-display-2">
          Your authentication is all sorted.
          <br />
          Build the important stuff.
        </p>
      </div>
      <section className="next-steps-section">
        <h2 className="text-heading-1">Tasks</h2>
        {auth ? <TaskList /> : <div>Not authenticated</div>}
      </section>
    </div>
  );
}
