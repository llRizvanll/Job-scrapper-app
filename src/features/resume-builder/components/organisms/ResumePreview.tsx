import React from 'react';
import type { ResumeData, Theme, DesignSettings, SectionConfig } from '../../types';
import EditableSection from '../molecules/EditableSection';
import TextFormatToolbar from './TextFormatToolbar';
import { colors } from '../../theme';

interface ResumePreviewProps {
  data: ResumeData;
  theme: Theme;
  designSettings?: DesignSettings;
  editMode?: boolean;
  selectedSection?: string | null;
  onSectionSelect?: (sectionId: string | null) => void;
  onSectionMoveUp?: (sectionId: string) => void;
  onSectionMoveDown?: (sectionId: string) => void;
  onSectionDelete?: (sectionId: string) => void;
  onSectionImprove?: (sectionId: string) => void;
  onDataChange?: (newData: ResumeData) => void;
  textFormatActions?: {
    onBold: () => void;
    onItalic: () => void;
    onUnderline: () => void;
    onBulletList: () => void;
    onNumberedList: () => void;
    onAlignLeft: () => void;
    onAlignCenter: () => void;
    onAlignRight: () => void;
    onAlignJustify: () => void;
    onLink: () => void;
    onClearFormatting: () => void;
  };
  className?: string;
}

type BlockType =
  | 'header'
  | 'section-title'
  | 'summary-content'
  | 'experience-item'
  | 'education-item'
  | 'skills-list'
  | 'certification-item'
  | 'section-spacing';

interface LayoutBlock {
  id: string;
  type: BlockType;
  sectionId: string;
  content: React.ReactNode;
  height?: number;
  isSectionStart?: boolean;
  dataIndex?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  theme,
  designSettings,
  editMode = false,
  selectedSection = null,
  onSectionSelect,
  onSectionMoveUp,
  onSectionMoveDown,
  onSectionDelete,
  onSectionImprove,
  onDataChange,
  textFormatActions,
  className = '',
}) => {
  const themeColor = designSettings?.themeColor || colors.indigo[600];

  const [paginatedLayout, setPaginatedLayout] = React.useState<LayoutBlock[][]>([[]]);
  const [measurementBlocks, setMeasurementBlocks] = React.useState<LayoutBlock[]>([]);
  const measureContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [layoutVersion, setLayoutVersion] = React.useState(0);

  const isLetter = designSettings?.page?.format === 'Letter';
  const PAGE_HEIGHT_MM = isLetter ? 279.4 : 297;
  const marginTop = designSettings?.page?.margins?.top ?? 15;
  const marginBottom = designSettings?.page?.margins?.bottom ?? 15;
  const SAFETY_MM = 10;
  const availableHeightPx = (PAGE_HEIGHT_MM - marginTop - marginBottom - SAFETY_MM) * 3.78;

  const getSectionConfig = (id: string): SectionConfig | undefined =>
    designSettings?.sections?.find((s) => s.id === id);

  const containerStyle = {
    fontFamily: designSettings?.fontFamily.text,
    fontSize: designSettings ? `${designSettings.fontSize}pt` : '11pt',
    lineHeight: designSettings?.lineHeight || 1.3,
    paddingTop: designSettings?.page?.margins
      ? `${designSettings.page.margins.top}mm`
      : undefined,
    paddingRight: designSettings?.page?.margins
      ? `${designSettings.page.margins.right}mm`
      : undefined,
    paddingBottom: designSettings?.page?.margins
      ? `${designSettings.page.margins.bottom}mm`
      : undefined,
    paddingLeft: designSettings?.page?.margins
      ? `${designSettings.page.margins.left}mm`
      : undefined,
    '--theme-color': themeColor,
  } as React.CSSProperties;

  const sectionSpacing = designSettings?.sectionSpacing ?? 5;
  const itemSpacing = designSettings?.itemSpacing ?? 3;
  const paragraphSpacing = designSettings?.paragraphSpacing ?? 2;
  const paragraphIndent = designSettings?.paragraphIndent ?? 0;

  const headerContainerStyle: React.CSSProperties = {
    marginBottom: `${Math.max(sectionSpacing - 2, 2)}mm`,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  };

  const nameSectionStyle: React.CSSProperties = {
    fontFamily: designSettings?.fontFamily.display,
    borderLeft: `5px solid ${themeColor}`,
    paddingLeft: '1.5rem',
  };

  const contactSectionStyle: React.CSSProperties = {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    fontSize: '0.85rem',
    lineHeight: '1.4',
    color: colors.gray[600],
    borderLeft: `1px solid ${colors.gray[200]}`,
    paddingLeft: '2rem',
    minWidth: '220px',
    flexShrink: 0,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: designSettings?.fontFamily.heading,
    fontSize: designSettings?.headingSize ? `${designSettings.headingSize}pt` : undefined,
    color: themeColor,
    borderColor: themeColor,
    borderBottomWidth: `${designSettings?.lineWeight ?? 1}px`,
  };

  const getSectionTitleClassName = () => {
    switch (theme) {
      case 'modern':
        return 'font-bold uppercase tracking-wider text-sm border-b mb-3 pb-2';
      case 'minimal':
        return 'font-black uppercase tracking-widest text-xs text-gray-400 mb-4 pb-1';
      case 'professional':
        return 'font-bold uppercase tracking-wide text-sm border-b-2 mb-4 pb-2';
      case 'creative':
        return 'font-black text-xl mb-4 text-opacity-80 pb-1';
      case 'executive':
        return 'font-serif font-bold uppercase tracking-widest text-sm text-center border-b mb-5 pb-3';
      default:
        return 'font-bold uppercase border-b border-gray-900 mb-3 pb-2 text-base';
    }
  };

  const renderHeader = () => (
    <header style={headerContainerStyle}>
      <div style={nameSectionStyle} className="flex-1">
        <h1
          className="text-4xl font-bold tracking-tight text-gray-900 leading-tight"
          contentEditable={editMode}
          suppressContentEditableWarning
          onBlur={(e) =>
            editMode &&
            onDataChange?.({
              ...data,
              name: e.currentTarget.textContent || '',
            })
          }
          onClick={(e) => {
            if (editMode) e.stopPropagation();
          }}
          style={{
            fontFamily: designSettings?.fontFamily.display,
            color: colors.gray[800],
            ...(editMode ? { cursor: 'text', outline: 'none' } : {}),
          }}
        >
          {data.name}
        </h1>
        {(data.headline || editMode) && (
          <p
            className="text-lg text-gray-500 font-medium tracking-wide mt-1"
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              editMode &&
              onDataChange?.({
                ...data,
                headline: e.currentTarget.textContent || '',
              })
            }
            onClick={(e) => {
              if (editMode) e.stopPropagation();
            }}
            style={editMode ? { cursor: 'text', outline: 'none' } : {}}
          >
            {data.headline || 'Your headline or current title'}
          </p>
        )}
      </div>

      <div style={contactSectionStyle}>
        <div className="flex gap-3 items-center">
          <span
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              editMode &&
              onDataChange?.({
                ...data,
                location: e.currentTarget.textContent || '',
              })
            }
            onClick={(e) => {
              if (editMode) e.stopPropagation();
            }}
            style={editMode ? { cursor: 'text', outline: 'none' } : {}}
          >
            {data.location}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <span
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              editMode &&
              onDataChange?.({
                ...data,
                phone: e.currentTarget.textContent || '',
              })
            }
            onClick={(e) => {
              if (editMode) e.stopPropagation();
            }}
            style={editMode ? { cursor: 'text', outline: 'none' } : {}}
          >
            {data.phone}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <a
            href={editMode ? undefined : `mailto:${data.email}`}
            className={`${!editMode ? 'hover:underline text-blue-600' : ''}`}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              editMode &&
              onDataChange?.({
                ...data,
                email: e.currentTarget.textContent || '',
              })
            }
            onClick={(e) => {
              if (editMode) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={
              editMode
                ? {
                    cursor: 'text',
                    outline: 'none',
                    color: 'inherit',
                    textDecoration: 'none',
                  }
                : {}
            }
          >
            {data.email}
          </a>
        </div>
        <div className="flex gap-3 items-center">
          <a
            href={editMode ? undefined : `https://${data.linkedin}`}
            className={`${!editMode ? 'hover:underline text-blue-600' : ''}`}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              editMode &&
              onDataChange?.({
                ...data,
                linkedin: e.currentTarget.textContent || '',
              })
            }
            onClick={(e) => {
              if (editMode) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={
              editMode
                ? {
                    cursor: 'text',
                    outline: 'none',
                    color: 'inherit',
                    textDecoration: 'none',
                  }
                : {}
            }
          >
            {data.linkedin}
          </a>
        </div>
        {data.website && (
          <div className="flex gap-3 items-center">
            <a
              href={editMode ? undefined : `https://${data.website}`}
              className={`${!editMode ? 'hover:underline text-blue-600' : ''}`}
              contentEditable={editMode}
              suppressContentEditableWarning
              onBlur={(e) =>
                editMode &&
                onDataChange?.({
                  ...data,
                  website: e.currentTarget.textContent || '',
                })
              }
              onClick={(e) => {
                if (editMode) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              style={
                editMode
                  ? {
                      cursor: 'text',
                      outline: 'none',
                      color: 'inherit',
                      textDecoration: 'none',
                    }
                  : {}
              }
            >
              {data.website}
            </a>
          </div>
        )}
        <div className="flex gap-3 items-center">
          <a
            href={editMode ? undefined : `https://${data.github}`}
            className={`${!editMode ? 'hover:underline text-blue-600' : ''}`}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) =>
              editMode &&
              onDataChange?.({
                ...data,
                github: e.currentTarget.textContent || '',
              })
            }
            onClick={(e) => {
              if (editMode) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={
              editMode
                ? {
                    cursor: 'text',
                    outline: 'none',
                    color: 'inherit',
                    textDecoration: 'none',
                  }
                : {}
            }
          >
            {data.github}
          </a>
        </div>
      </div>
    </header>
  );

  const renderSummaryContent = () => (
    <p
      className="text-gray-700 text-left"
      style={{
        marginBottom: `${paragraphSpacing}mm`,
        paddingLeft: `${paragraphIndent}mm`,
      }}
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={(e) =>
        editMode &&
        onDataChange?.({
          ...data,
          summary: e.currentTarget.textContent || '',
        })
      }
    >
      {data.summary}
    </p>
  );

  const renderExperienceItem = (exp: ResumeData['experience'][number]) => {
    const settings = getSectionConfig('experience')?.settings || {};
    return (
      <div
        className="experience-entry"
        style={{
          marginBottom: `${itemSpacing}mm`,
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        }}
      >
        <div className="flex justify-between items-baseline font-bold text-gray-900">
          <span className="text-base">{exp.company}</span>
          {settings.showLocation !== false && <span>{exp.location}</span>}
        </div>
        <div className="flex justify-between items-baseline mb-1 italic text-gray-700 font-medium">
          <span style={{ color: theme === 'creative' ? themeColor : undefined }}>{exp.role}</span>
          {settings.showDate !== false && <span>{exp.period}</span>}
        </div>
        <div
          className="flex flex-col gap-1 mt-2"
          style={{ paddingLeft: `${paragraphIndent}mm` }}
        >
          {exp.bullets.map((bullet, bIdx) => (
            <div
              key={bIdx}
              className="flex items-center gap-2 relative"
              style={{ marginBottom: `${paragraphSpacing}mm` }}
            >
              <span
                className="text-gray-700 select-none leading-[1.4] transform scale-150 relative flex-shrink-0"
                style={{ color: themeColor }}
              >
                •
              </span>
              <span
                className="text-left flex-1 leading-relaxed text-gray-700"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (editMode && onDataChange) {
                    const newBullets = [...exp.bullets];
                    newBullets[bIdx] = e.currentTarget.textContent || '';
                    const newExperience = data.experience.map((ex) =>
                      ex.id === exp.id ? { ...ex, bullets: newBullets } : ex,
                    );
                    onDataChange({ ...data, experience: newExperience });
                  }
                }}
              >
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducationList = () => {
    const settings = getSectionConfig('education')?.settings || {};
    return (
      <div
        className="grid grid-cols-1 gap-2"
        style={{ paddingLeft: `${paragraphIndent}mm` }}
      >
        {data.education.map((edu) => (
          <div
            key={edu.id}
            className="flex justify-between items-baseline"
            style={{
              marginBottom: `${itemSpacing}mm`,
              pageBreakInside: 'avoid',
              breakInside: 'avoid',
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span
                className="font-bold text-gray-900 leading-snug"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (editMode && onDataChange) {
                    const newEdu = data.education.map((item) =>
                      item.id === edu.id
                        ? { ...item, school: e.currentTarget.textContent || '' }
                        : item,
                    );
                    onDataChange({ ...data, education: newEdu });
                  }
                }}
              >
                {edu.school}
              </span>
              <p
                className="text-gray-700 leading-snug"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (editMode && onDataChange) {
                    const newEdu = data.education.map((item) =>
                      item.id === edu.id
                        ? { ...item, degree: e.currentTarget.textContent || '' }
                        : item,
                    );
                    onDataChange({ ...data, education: newEdu });
                  }
                }}
              >
                {edu.degree}
              </p>
              {settings.showLocation !== false && (
                <p
                  className="text-xs text-gray-500 leading-tight"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (editMode && onDataChange) {
                      const newEdu = data.education.map((item) =>
                        item.id === edu.id
                          ? { ...item, location: e.currentTarget.textContent || '' }
                          : item,
                      );
                      onDataChange({ ...data, education: newEdu });
                    }
                  }}
                >
                  {edu.location}
                </p>
              )}
            </div>
            <span
              className="font-bold text-gray-700 whitespace-nowrap ml-4 leading-snug"
              contentEditable={editMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (editMode && onDataChange) {
                  const newEdu = data.education.map((item) =>
                    item.id === edu.id
                      ? { ...item, period: e.currentTarget.textContent || '' }
                      : item,
                  );
                  onDataChange({ ...data, education: newEdu });
                }
              }}
            >
              {edu.period}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderSkillsContent = () => {
    const settings = getSectionConfig('skills')?.settings || {};
    const layout = settings.layout || 'comma';

    if (layout === 'tags') {
      return (
        <div
          className="flex flex-wrap gap-2 items-center"
          style={{ paddingLeft: `${paragraphIndent}mm` }}
        >
          {data.skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold border border-gray-200 leading-none"
              style={{
                borderColor: theme === 'creative' ? `${themeColor}40` : undefined,
                backgroundColor: theme === 'creative' ? `${themeColor}10` : undefined,
                color: theme === 'creative' ? themeColor : undefined,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      );
    }

    if (layout === 'list') {
      return (
        <ul
          className="list-disc ml-4 space-y-1"
          style={{ paddingLeft: `${paragraphIndent}mm` }}
        >
          {data.skills.map((skill, idx) => (
            <li
              key={idx}
              className="text-gray-700"
              style={{ marginBottom: `${paragraphSpacing / 2}mm` }}
            >
              {skill}
            </li>
          ))}
        </ul>
      );
    }

    if (layout === 'columns') {
      return (
        <div
          className="grid grid-cols-2 gap-x-6 gap-y-1"
          style={{ paddingLeft: `${paragraphIndent}mm` }}
        >
          {data.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"
                style={{ backgroundColor: themeColor }}
              />
              <span className="text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <p
        className="text-gray-700"
        style={{
          marginBottom: `${paragraphSpacing}mm`,
          paddingLeft: `${paragraphIndent}mm`,
        }}
        contentEditable={editMode}
        suppressContentEditableWarning
        onBlur={(e) => {
          if (editMode && onDataChange) {
            const skillsText = e.currentTarget.textContent || '';
            const skillsArray = skillsText
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
            onDataChange({ ...data, skills: skillsArray });
          }
        }}
      >
        {data.skills.join(', ')}
      </p>
    );
  };

  const renderCertificationsContent = () => {
    const certLayout = designSettings?.themeConfig?.certificationLayout || 'inline';
    return (
      <div
        className={`grid ${
          certLayout === 'stacked' ? 'grid-cols-1 gap-1.5' : 'grid-cols-2 gap-x-6 gap-y-1'
        }`}
        style={{ paddingLeft: `${paragraphIndent}mm` }}
      >
        {data.certifications.map((cert) => (
          <div
            key={cert.id}
            className={
              certLayout === 'stacked'
                ? 'border-b border-gray-100 pb-1 mb-1 last:border-0'
                : ''
            }
            style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
          >
            <div className="flex justify-between items-baseline">
              <span
                className="font-bold text-gray-900 leading-snug"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (editMode && onDataChange) {
                    const newCerts = data.certifications.map((item) =>
                      item.id === cert.id
                        ? { ...item, name: e.currentTarget.textContent || '' }
                        : item,
                    );
                    onDataChange({ ...data, certifications: newCerts });
                  }
                }}
              >
                {cert.name}
              </span>
              {certLayout === 'stacked' && (
                <span
                  className="text-sm font-medium text-gray-600 whitespace-nowrap ml-2 leading-snug"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (editMode && onDataChange) {
                      const newCerts = data.certifications.map((item) =>
                        item.id === cert.id
                          ? { ...item, date: e.currentTarget.textContent || '' }
                          : item,
                      );
                      onDataChange({ ...data, certifications: newCerts });
                    }
                  }}
                >
                  {cert.date}
                </span>
              )}
            </div>
            <div
              className={`flex justify-between text-xs text-gray-600 ${
                certLayout === 'stacked' ? 'mt-0.5' : ''
              }`}
            >
              <span
                className="leading-tight"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (editMode && onDataChange) {
                    const newCerts = data.certifications.map((item) =>
                      item.id === cert.id
                        ? { ...item, issuer: e.currentTarget.textContent || '' }
                        : item,
                    );
                    onDataChange({ ...data, certifications: newCerts });
                  }
                }}
              >
                {cert.issuer} {cert.expiry && `| Exp: ${cert.expiry}`}
              </span>
              {certLayout !== 'stacked' && (
                <span
                  className="font-medium leading-tight text-right ml-2"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (editMode && onDataChange) {
                      const newCerts = data.certifications.map((item) =>
                        item.id === cert.id
                          ? { ...item, date: e.currentTarget.textContent || '' }
                          : item,
                      );
                      onDataChange({ ...data, certifications: newCerts });
                    }
                  }}
                >
                  {cert.date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  React.useEffect(() => {
    const blocks: LayoutBlock[] = [];

    blocks.push({
      id: 'main-header',
      type: 'header',
      sectionId: 'header',
      content: renderHeader(),
      isSectionStart: false,
    });

    const sections =
      designSettings?.sections ||
      ([
        { id: 'summary', name: 'Professional Summary', visible: true, type: 'section' },
        { id: 'experience', name: 'Work History', visible: true, type: 'section' },
        { id: 'skills', name: 'Skills', visible: true, type: 'section' },
        { id: 'education', name: 'Education', visible: true, type: 'section' },
        { id: 'certifications', name: 'Certifications', visible: true, type: 'section' },
      ] as SectionConfig[]);

    sections
      .filter((s) => s.visible && s.type !== 'break')
      .forEach((section) => {
        blocks.push({
          id: `section-title-${section.id}`,
          type: 'section-title',
          sectionId: section.id,
          content: (
            <div style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
              <h2 className={getSectionTitleClassName()} style={headingStyle}>
                {section.name}
              </h2>
            </div>
          ),
          isSectionStart: true,
        });

        switch (section.id) {
          case 'summary':
            blocks.push({
              id: 'summary-content',
              type: 'summary-content',
              sectionId: 'summary',
              content: renderSummaryContent(),
            });
            break;
          case 'experience':
            data.experience.forEach((exp, idx) => {
              blocks.push({
                id: `exp-${exp.id}`,
                type: 'experience-item',
                sectionId: 'experience',
                dataIndex: idx,
                content: renderExperienceItem(exp),
              });
            });
            break;
          case 'education':
            blocks.push({
              id: 'education-list',
              type: 'education-item',
              sectionId: 'education',
              content: renderEducationList(),
            });
            break;
          case 'skills':
            blocks.push({
              id: 'skills-content',
              type: 'skills-list',
              sectionId: 'skills',
              content: renderSkillsContent(),
            });
            break;
          case 'certifications':
            blocks.push({
              id: 'certs-content',
              type: 'certification-item',
              sectionId: 'certifications',
              content: renderCertificationsContent(),
            });
            break;
          default:
            break;
        }
      });

    setMeasurementBlocks(blocks);
  }, [data, designSettings, theme, editMode, selectedSection]);

  React.useLayoutEffect(() => {
    if (!measureContainerRef.current) return;

    const container = measureContainerRef.current;
    const computedPages: LayoutBlock[][] = [[]];
    let currentPageIdx = 0;
    let currentHeight = 0;

    measurementBlocks.forEach((block, blockIndex) => {
      const element = container.querySelector<HTMLElement>(`[data-block-id="${block.id}"]`);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const mt = parseFloat(style.marginTop) || 0;
      const mb = parseFloat(style.marginBottom) || 0;
      const totalBlockHeight = rect.height + mt + mb;

      const isSectionTitle = block.type === 'section-title';
      let shouldMoveToNewPage = false;

      if (isSectionTitle && blockIndex < measurementBlocks.length - 1) {
        const nextBlock = measurementBlocks[blockIndex + 1];
        const nextElement = container.querySelector<HTMLElement>(
          `[data-block-id="${nextBlock.id}"]`,
        );
        if (nextElement && nextBlock.type !== 'section-title' && nextBlock.type !== 'section-spacing') {
          const nextRect = nextElement.getBoundingClientRect();
          const nextStyle = window.getComputedStyle(nextElement);
          const nextMt = parseFloat(nextStyle.marginTop) || 0;
          const nextMb = parseFloat(nextStyle.marginBottom) || 0;
          const nextTotalHeight = nextRect.height + nextMt + nextMb;

          if (currentHeight + totalBlockHeight + nextTotalHeight > availableHeightPx && currentHeight > 0) {
            shouldMoveToNewPage = true;
          }
        } else if (currentHeight + totalBlockHeight > availableHeightPx && currentHeight > 0) {
          shouldMoveToNewPage = true;
        }
      } else if (currentHeight + totalBlockHeight > availableHeightPx && currentHeight > 0) {
        shouldMoveToNewPage = true;
      }

      if (shouldMoveToNewPage) {
        currentPageIdx += 1;
        computedPages[currentPageIdx] = [];
        currentHeight = 0;
      }

      computedPages[currentPageIdx].push({ ...block, height: rect.height });
      currentHeight += totalBlockHeight;
    });

    if (computedPages.length === 0) {
      computedPages.push([]);
    }

    setPaginatedLayout(computedPages);
  }, [measurementBlocks, availableHeightPx, layoutVersion]);

  React.useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) return;
    (document as any).fonts.ready.then(() => setLayoutVersion((v: number) => v + 1));
  }, []);

  return (
    <div className={`flex flex-col gap-8 print:gap-0 font-serif ${className}`}>
      <div
        ref={measureContainerRef}
        style={{
          ...containerStyle,
          position: 'absolute',
          visibility: 'hidden',
          zIndex: -100,
          width: 'var(--print-width)',
          top: 0,
        }}
        aria-hidden="true"
      >
        {measurementBlocks.map((block) => (
          <div key={block.id} data-block-id={block.id}>
            {block.content}
          </div>
        ))}
      </div>

      {paginatedLayout.map((pageBlocks, pageIndex) => (
        <div
          key={pageIndex}
          className="resume-page text-gray-800 mx-auto bg-white shadow-2xl print:shadow-none relative"
          style={containerStyle}
        >
          {pageBlocks.map((block) => {
            if (editMode && block.isSectionStart) {
              const visibleSections =
                designSettings?.sections?.filter((s) => s.visible && s.type !== 'break') || [];
              const visibleIndex = visibleSections.findIndex((s) => s.id === block.sectionId);
              const canMoveUp = visibleIndex > 0;
              const canMoveDown = visibleIndex < visibleSections.length - 1;
              const isSelected = selectedSection === block.sectionId;

              return (
                <EditableSection
                  key={block.id}
                  id={block.sectionId}
                  title={block.sectionId}
                  isSelected={isSelected}
                  canMoveUp={canMoveUp}
                  canMoveDown={canMoveDown}
                  onSelect={() => onSectionSelect?.(block.sectionId)}
                  onMoveUp={() => onSectionMoveUp?.(block.sectionId)}
                  onMoveDown={() => onSectionMoveDown?.(block.sectionId)}
                  onDelete={() => onSectionDelete?.(block.sectionId)}
                  onImproveWithAI={() => onSectionImprove?.(block.sectionId)}
                >
                  {isSelected && textFormatActions && (
                    <div className="absolute -top-12 left-0 right-0 flex justify-center z-50">
                      <TextFormatToolbar visible {...textFormatActions} />
                    </div>
                  )}
                  {block.content}
                </EditableSection>
              );
            }

            return (
              <div
                key={block.id}
                style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
              >
                {block.content}
              </div>
            );
          })}

          {designSettings?.showPageNumbers && (
            <div className="absolute bottom-8 right-8 text-xs text-gray-400 print:hidden">
              Page {pageIndex + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;

