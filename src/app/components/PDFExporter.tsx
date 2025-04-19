import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function PDFExporter({ contentRef, fileName = 'relatorio', onExportStart, onExportEnd }) {
  const [exporting, setExporting] = useState(false);

  const exportToPDF = async () => {
    if (!contentRef.current || exporting) return;
    
    try {
      setExporting(true);
      if (onExportStart) onExportStart();
      
      // Configurar o documento PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Capturar o conteúdo como imagem
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Maior qualidade
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calcular a proporção para ajustar ao tamanho da página
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      // Adicionar a imagem ao PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Salvar o PDF
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    } finally {
      setExporting(false);
      if (onExportEnd) onExportEnd();
    }
  };

  return {
    exportToPDF,
    exporting
  };
}
