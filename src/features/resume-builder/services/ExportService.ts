import type { DesignSettings } from '../types';

const waitForLayout = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => setTimeout(resolve, 50)));

export const ExportService = {
  generatePDF: async (designSettings: DesignSettings): Promise<any> => {
    const resumePages = document.querySelectorAll('.resume-page');
    if (resumePages.length === 0) {
      throw new Error('Resume preview not found');
    }

    const scrollContainer = document.querySelector<HTMLElement>('[data-pdf-export-scroll]');
    const scaleWrapper = document.querySelector<HTMLElement>('[data-pdf-export-scale-wrapper]');

    const { jsPDF } = (window as any).jspdf ?? {};
    const html2canvas = (window as any).html2canvas;

    if (!jsPDF || !html2canvas) {
      throw new Error('PDF export libraries are not loaded');
    }

    const isLetter = designSettings?.page?.format === 'Letter';
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isLetter ? 'letter' : 'a4',
    });

    const savedScrollTop = scrollContainer?.scrollTop ?? 0;
    const savedScaleTransform = scaleWrapper?.style.transform ?? '';
    const savedScaleTransition = scaleWrapper?.style.transition ?? '';

    try {
      if (scrollContainer) scrollContainer.scrollTop = 0;
      if (scaleWrapper) {
        scaleWrapper.style.transition = 'none';
        scaleWrapper.style.transform = 'none';
      }
      await waitForLayout();

      for (let i = 0; i < resumePages.length; i += 1) {
        const pageElement = resumePages[i] as HTMLElement;
        pageElement.classList.add('exporting');
        pageElement.scrollIntoView({ block: 'start', behavior: 'auto' });
        await waitForLayout();

        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pageElement.classList.remove('exporting');
      }

      return pdf;
    } finally {
      if (scrollContainer) scrollContainer.scrollTop = savedScrollTop;
      if (scaleWrapper) {
        scaleWrapper.style.transform = savedScaleTransform;
        scaleWrapper.style.transition = savedScaleTransition;
      }
      resumePages.forEach((p) => p.classList.remove('exporting'));
    }
  },

  exportToPDF: async (designSettings: DesignSettings): Promise<void> => {
    const pdf = await ExportService.generatePDF(designSettings);
    const filename = `Resume_${designSettings.page.format}_${
      new Date().toISOString().split('T')[0]
    }.pdf`;
    pdf.save(filename);
  },

  getPDFBlobUrl: async (designSettings: DesignSettings): Promise<string> => {
    const pdf = await ExportService.generatePDF(designSettings);
    const blob = pdf.output('blob');
    return URL.createObjectURL(blob);
  },
};

