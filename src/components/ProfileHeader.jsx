export default function ProfileHeader({ profile }) {
  return (
    <header className="profile-header text-center">
      <div className="avatar-shell mx-auto mb-5 h-28 w-28 rounded-full p-[3px] sm:h-32 sm:w-32">
        <img
          className="profile-avatar h-full w-full rounded-full object-cover"
          src={profile.profileImage}
          alt={`${profile.name}, ${profile.title}`}
          width="128"
          height="128"
          fetchPriority="high"
        />
      </div>
      <p className="eyebrow mb-2 font-display text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
        {profile.title}
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{profile.name}</h1>
      <p className="profile-bio mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400 sm:text-[15px]">
        {profile.bio}
      </p>
      <div className="heading-block mt-7">
        <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{profile.description}</h2>
        <p className="mt-1.5 text-sm text-slate-500">Find me across the web</p>
      </div>
    </header>
  );
}
