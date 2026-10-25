import { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Github, Search, RefreshCw, ExternalLink, Users, BookOpen, MapPin } from 'lucide-react';

export default function GitHubProfileViewer() {
  // This state is used to track the username input in the search field
  const [username, setUsername] = useState('gaearon');
  // This state is used to store fetched profile data from GitHub API
  const [profile, setProfile] = useState(null);
  // This state is used to track whether the network request is loading
  const [loading, setLoading] = useState(false);
  // This state is used to store error messages if the API request fails
  const [error, setError] = useState(null);

  // This function is used to fetch developer profile data from GitHub REST API
  const fetchGitHubUser = async (targetUser) => {
    if (!targetUser || !targetUser.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(targetUser.trim())}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${targetUser}" was not found.`);
        } else if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. Please try again later.');
        } else {
          throw new Error(`API error (HTTP ${response.status}).`);
        }
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch GitHub profile.');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // This effect is used to fetch the initial profile when the component mounts
  useEffect(() => {
    fetchGitHubUser('gaearon');
  }, []);

  // This function is used to handle form submission for searching a username
  const handleSearch = (e) => {
    e.preventDefault();
    fetchGitHubUser(username);
  };

  // This function is used to retry the network request if an error occurred
  const handleRetry = () => {
    fetchGitHubUser(username);
  };

  return (
    <Card className="dash-card" style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Github size={20} color="#0f172a" />
          <h3 style={{ fontSize: 16 }}>GitHub Developer Profile Viewer</h3>
        </div>
        <span style={{ fontSize: 11, background: '#f1f5f9', padding: '3px 8px', borderRadius: 4, color: '#475569', fontWeight: 600 }}>
          REST API Demo (Lectures 67–72)
        </span>
      </div>

      <p className="text-secondary" style={{ fontSize: 13, marginBottom: 14 }}>
        Demonstrates consuming public REST APIs with <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: 4 }}>fetch()</code>, loading spinners, error handling, and retry logic.
      </p>

      {/* Search form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter any GitHub username (e.g. gaearon, torvalds, shadcn)..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 34px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontSize: 13,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: 10, top: 10 }} />
        </div>
        <Button size="sm" type="submit" disabled={loading || !username.trim()}>
          {loading ? 'Fetching...' : 'Search'}
        </Button>
      </form>

      {/* Quick profile presets */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#64748b' }}>Quick test:</span>
        {['gaearon', 'facebook', 'shadcn', 'torvalds'].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setUsername(preset);
              fetchGitHubUser(preset);
            }}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 11,
              cursor: 'pointer',
              color: '#334155',
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b', fontSize: 13 }}>
          <RefreshCw size={20} className="spin" style={{ marginBottom: 8, display: 'inline-block' }} />
          <div>Fetching developer data from api.github.com...</div>
        </div>
      )}

      {/* Error state with Retry button */}
      {error && !loading && (
        <div style={{ padding: 14, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', marginBottom: 12 }}>
          <p style={{ color: '#b91c1c', fontSize: 13, margin: '0 0 8px 0' }}>{error}</p>
          <Button size="sm" variant="secondary" onClick={handleRetry} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={12} /> Retry Request
          </Button>
        </div>
      )}

      {/* Profile data display */}
      {profile && !loading && !error && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: 16,
            borderRadius: 10,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <img
              src={profile.avatar_url}
              alt={profile.login}
              style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid #cbd5e1' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h4 style={{ margin: 0, fontSize: 15, color: '#0f172a' }}>{profile.name || profile.login}</h4>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}
                >
                  @{profile.login} <ExternalLink size={11} />
                </a>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#64748b' }}>
                {profile.bio || 'Software developer and open-source contributor.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid #e2e8f0', fontSize: 12, color: '#475569' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <BookOpen size={14} color="#059669" /> <strong>{profile.public_repos}</strong> Public Repos
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Users size={14} color="#059669" /> <strong>{profile.followers}</strong> Followers
            </span>
            {profile.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} color="#64748b" /> {profile.location}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
