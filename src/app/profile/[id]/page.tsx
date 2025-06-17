export default function userProfile({params} : any) {
    return (
      <div>
        <h1 className="text-4xl"> Your Profile {params.id} </h1>
        <p>Manage your account settings and preferences here.</p>
      </div>
    );
}
// This is a placeholder for the user profile page.
// You can add more functionality like fetching user data, updating settings, etc.