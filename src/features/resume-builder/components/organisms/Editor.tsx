import React from 'react';
import type { ResumeData, Experience } from '../../types';

interface EditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const updateField = (field: keyof ResumeData, value: unknown) => {
    onChange({ ...data, [field]: value as never });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    const newExp = data.experience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp));
    updateField('experience', newExp);
  };

  const updateExperienceBullet = (expId: string, bulletIdx: number, val: string) => {
    const newExp = data.experience.map((exp) => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = val;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    });
    updateField('experience', newExp);
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm max-h-[85vh] overflow-y-auto">
      <section>
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">Personal Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Name"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
          <input
            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Location"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
          />
          <input
            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
          <input
            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">Summary</h3>
        <textarea
          className="w-full p-2 border rounded h-32 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
        />
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">Work Experience</h3>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                className="p-2 border rounded text-sm font-bold"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder="Company"
              />
              <input
                className="p-2 border rounded text-sm"
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                placeholder="Role"
              />
              <input
                className="p-2 border rounded text-xs"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                placeholder="Location"
              />
              <input
                className="p-2 border rounded text-xs"
                value={exp.period}
                onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                placeholder="Period"
              />
            </div>
            <div className="space-y-2">
              {exp.bullets.map((bullet, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-gray-400 mt-2">•</span>
                  <textarea
                    className="flex-1 p-2 border rounded text-xs h-16 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={bullet}
                    onChange={(e) => updateExperienceBullet(exp.id, idx, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">Education</h3>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 gap-3">
              <input
                className="p-2 border rounded text-sm font-bold"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = data.education.map((item) =>
                    item.id === edu.id ? { ...item, school: e.target.value } : item,
                  );
                  updateField('education', newEdu);
                }}
                placeholder="School / University"
              />
              <input
                className="p-2 border rounded text-sm"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = data.education.map((item) =>
                    item.id === edu.id ? { ...item, degree: e.target.value } : item,
                  );
                  updateField('education', newEdu);
                }}
                placeholder="Degree"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="p-2 border rounded text-xs"
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = data.education.map((item) =>
                      item.id === edu.id ? { ...item, location: e.target.value } : item,
                    );
                    updateField('education', newEdu);
                  }}
                  placeholder="Location"
                />
                <input
                  className="p-2 border rounded text-xs"
                  value={edu.period}
                  onChange={(e) => {
                    const newEdu = data.education.map((item) =>
                      item.id === edu.id ? { ...item, period: e.target.value } : item,
                    );
                    updateField('education', newEdu);
                  }}
                  placeholder="Period"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">Certifications</h3>
        {data.certifications.map((cert) => (
          <div key={cert.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 gap-3">
              <input
                className="p-2 border rounded text-sm font-bold"
                value={cert.name}
                onChange={(e) => {
                  const newCerts = data.certifications.map((item) =>
                    item.id === cert.id ? { ...item, name: e.target.value } : item,
                  );
                  updateField('certifications', newCerts);
                }}
                placeholder="Certification Name"
              />
              <input
                className="p-2 border rounded text-sm"
                value={cert.issuer}
                onChange={(e) => {
                  const newCerts = data.certifications.map((item) =>
                    item.id === cert.id ? { ...item, issuer: e.target.value } : item,
                  );
                  updateField('certifications', newCerts);
                }}
                placeholder="Issuer"
              />
              <input
                className="p-2 border rounded text-xs"
                value={cert.date}
                onChange={(e) => {
                  const newCerts = data.certifications.map((item) =>
                    item.id === cert.id ? { ...item, date: e.target.value } : item,
                  );
                  updateField('certifications', newCerts);
                }}
                placeholder="Date"
              />
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">
          Skills (Comma separated)
        </h3>
        <textarea
          className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          value={data.skills.join(', ')}
          onChange={(e) =>
            updateField(
              'skills',
              e.target.value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </section>
    </div>
  );
};

export default Editor;

