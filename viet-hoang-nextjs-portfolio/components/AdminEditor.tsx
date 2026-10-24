"use client";

import { ChangeEvent, useEffect, useState } from "react";

type Game = { title: string; description: string; category: string; platform: string; image: string; link: string };
type SiteData = { name: string; role: string; intro: string; email: string; location: string; github: string; cvLink: string; heroImage: string; about: string; skills: string; games: Game[] };
const defaults: SiteData = {
  name: "Viet Hoang", role: "Unity Game Developer",
  intro: "I create casual and hyper-casual games, turning simple ideas into fun, engaging experiences.",
  email: "vhoang0327@gmail.com", location: "Hanoi, Vietnam", github: "https://github.com/", cvLink: "", heroImage: "",
  about: "I’m passionate about game development and always eager to learn new skills. I enjoy building small games, improving my craft, and turning creative ideas into playable experiences.",
  skills: "Unity, C#, Visual Studio, Git, Blender (basic), Photoshop (basic), Aseprite, Game Design",
  games: [
    { title: "Rolling Ball Rush", description: "Roll, dodge and reach the finish line! A simple but addictive casual game.", category: "Casual · 3D", platform: "Unity", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85", link: "" },
    { title: "Shadow Runner", description: "Run, jump and avoid obstacles in this fast-paced 2D platformer.", category: "Platformer · 2D", platform: "Unity", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85", link: "" },
    { title: "Black Hole Clicker", description: "Click, collect, upgrade. Grow your black hole and consume the universe!", category: "Idle · Incremental", platform: "Unity", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=85", link: "" }
  ]
};
const KEY = "vh-portfolio-data";

export default function AdminEditor() {
  const [data, setData] = useState<SiteData>(defaults);
  const [status, setStatus] = useState("");
  const [activeGame, setActiveGame] = useState(0);

  useEffect(() => {
    try { const saved = localStorage.getItem(KEY); if (saved) setData({ ...defaults, ...JSON.parse(saved) }); } catch {}
  }, []);
  const update = (key: keyof SiteData, value: string) => setData(prev => ({ ...prev, [key]: value }));
  const updateGame = (index: number, key: keyof Game, value: string) => setData(prev => ({ ...prev, games: prev.games.map((g, i) => i === index ? { ...g, [key]: value } : g) }));
  const uploadImage = (event: ChangeEvent<HTMLInputElement>, apply: (url: string) => void) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 1_500_000) { setStatus("Ảnh hơi lớn — hãy chọn ảnh dưới 1.5 MB để lưu ổn định."); return; }
    const reader = new FileReader(); reader.onload = () => apply(String(reader.result)); reader.readAsDataURL(file);
  };
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); setStatus("Đã lưu thay đổi trên trình duyệt này! Mở trang chủ để xem."); }
    catch { setStatus("Không lưu được — có thể ảnh quá lớn, hãy dùng ảnh có URL hoặc ảnh nhỏ hơn."); }
  };
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "portfolio-backup.json"; a.click(); URL.revokeObjectURL(url);
  };
  const importData = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader(); reader.onload = () => { try { setData({ ...defaults, ...JSON.parse(String(reader.result)) }); setStatus("Đã tải dữ liệu. Nhấn Lưu thay đổi để áp dụng."); } catch { setStatus("File không hợp lệ."); } }; reader.readAsText(file);
  };
  const reset = () => { if (confirm("Khôi phục nội dung mẫu? Các chỉnh sửa hiện tại sẽ bị thay thế.")) { setData(defaults); localStorage.removeItem(KEY); setStatus("Đã khôi phục nội dung mẫu."); } };

  return <main className="admin-page"><header className="admin-top"><a className="brand" href="/">← Xem website</a><span className="admin-badge">VISUAL EDITOR</span></header>
    <div className="admin-wrap"><div className="admin-intro"><p className="eyebrow">Không cần biết code</p><h1>Chỉnh sửa portfolio</h1><p>Điền nội dung, đổi ảnh rồi bấm <b>Lưu thay đổi</b>. Mọi thứ được lưu trong trình duyệt đang sử dụng.</p></div>
      <div className="admin-actions"><button className="button primary" onClick={save}>Lưu thay đổi ✓</button><a className="button secondary" href="/" target="_blank">Mở bản xem trước ↗</a><button className="button secondary" onClick={exportData}>Tải bản sao lưu ↓</button><label className="button secondary file-button">Nhập bản sao lưu<input type="file" accept="application/json" onChange={importData}/></label></div>
      {status && <p className="status-message" role="status">{status}</p>}
      <section className="editor-section"><h2>01 / Thông tin cá nhân</h2><div className="form-grid">
        <Field label="Tên hiển thị" value={data.name} onChange={v=>update("name",v)} /><Field label="Chức danh" value={data.role} onChange={v=>update("role",v)} />
        <Field label="Email" value={data.email} onChange={v=>update("email",v)} /><Field label="Địa điểm" value={data.location} onChange={v=>update("location",v)} />
        <Field label="Link GitHub / mạng xã hội" value={data.github} onChange={v=>update("github",v)} /><Field label="Link CV (không bắt buộc)" value={data.cvLink} onChange={v=>update("cvLink",v)} />
        <TextField label="Lời giới thiệu ở đầu trang" value={data.intro} onChange={v=>update("intro",v)} /><TextField label="Giới thiệu bản thân" value={data.about} onChange={v=>update("about",v)} />
        <TextField label="Kỹ năng (ngăn cách bằng dấu phẩy)" value={data.skills} onChange={v=>update("skills",v)} />
      </div></section>
      <section className="editor-section"><h2>02 / Ảnh đầu trang</h2><p className="hint">Dán link ảnh trực tiếp hoặc tải ảnh nhỏ lên. Nếu để trống, website dùng hình minh họa mặc định.</p><Field label="Đường dẫn ảnh" value={data.heroImage.startsWith("data:") ? "" : data.heroImage} onChange={v=>update("heroImage",v)} placeholder="https://..." /><label className="upload-label">Hoặc tải ảnh từ máy<input type="file" accept="image/*" onChange={e=>uploadImage(e, url=>update("heroImage",url))}/></label>{data.heroImage && <img className="upload-preview" src={data.heroImage} alt="Xem trước ảnh đầu trang"/>}</section>
      <section className="editor-section"><h2>03 / Ba dự án game</h2><div className="game-tabs">{data.games.map((g,i)=><button className={activeGame===i?"tab active":"tab"} key={i} onClick={()=>setActiveGame(i)}>{i+1}. {g.title || "Game mới"}</button>)}</div>
        {data.games[activeGame] && <div className="form-grid game-form"><Field label="Tên game" value={data.games[activeGame].title} onChange={v=>updateGame(activeGame,"title",v)} /><Field label="Thể loại" value={data.games[activeGame].category} onChange={v=>updateGame(activeGame,"category",v)} /><Field label="Nền tảng / công cụ" value={data.games[activeGame].platform} onChange={v=>updateGame(activeGame,"platform",v)} /><Field label="Link game / video / trang dự án" value={data.games[activeGame].link} onChange={v=>updateGame(activeGame,"link",v)} placeholder="https://..."/><TextField label="Mô tả ngắn" value={data.games[activeGame].description} onChange={v=>updateGame(activeGame,"description",v)} /><Field label="Đường dẫn ảnh thumbnail" value={data.games[activeGame].image.startsWith("data:") ? "" : data.games[activeGame].image} onChange={v=>updateGame(activeGame,"image",v)} placeholder="https://..."/></div>}
        {data.games[activeGame] && <div className="upload-row"><label className="upload-label">Tải thumbnail từ máy<input type="file" accept="image/*" onChange={e=>uploadImage(e,url=>updateGame(activeGame,"image",url))}/></label>{data.games[activeGame].image && <img className="thumb-preview" src={data.games[activeGame].image} alt="Xem trước thumbnail"/>}</div>}
      </section>
      <div className="admin-actions bottom-actions"><button className="button primary" onClick={save}>Lưu thay đổi ✓</button><button className="button secondary" onClick={reset}>Khôi phục nội dung mẫu</button></div>
      <p className="hint bottom-hint">Lưu ý: bản chỉnh sửa hiện lưu trên thiết bị/trình duyệt này, chưa đồng bộ giữa các thiết bị và chưa tự cập nhật bản website đã triển khai trên Internet. Hãy tải bản sao lưu định kỳ.</p>
    </div>
  </main>;
}

function Field({ label, value, onChange, placeholder="" }: { label: string; value: string; onChange: (v:string)=>void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>;
}
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v:string)=>void }) {
  return <label className="field field-wide"><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)} rows={3}/></label>;
}
