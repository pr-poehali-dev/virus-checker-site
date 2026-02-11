import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [scanning, setScanning] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const startScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-effect">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold glow-text">VirusGuard</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Возможности</a>
            <a href="#docs" className="text-sm hover:text-primary transition-colors">Документация</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">О сервисе</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 glow-effect">
            <Icon name="LogIn" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 glow-text">
            Проверка файлов на вирусы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Множественное сканирование с использованием облачных антивирусных движков. 
            Быстро, надежно, безопасно.
          </p>
        </div>

        <Card 
          className={`max-w-3xl mx-auto p-8 border-2 transition-all ${
            isDragging ? 'border-primary bg-primary/5 glow-effect' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {files.length === 0 ? (
              <>
                <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center animate-float">
                  <Icon name="Upload" size={48} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Загрузите файлы для проверки</h3>
                <p className="text-muted-foreground mb-6">
                  Перетащите файлы сюда или выберите с устройства
                </p>
                <label htmlFor="file-upload">
                  <Button className="bg-primary hover:bg-primary/90 glow-effect cursor-pointer" asChild>
                    <span>
                      <Icon name="FolderOpen" size={18} className="mr-2" />
                      Выбрать файлы
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground mt-4">
                  Поддерживаются все типы файлов. Максимум 100 файлов одновременно.
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Выбрано файлов: {files.length}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFiles([])}
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Очистить
                  </Button>
                </div>
                
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
                      <Icon name="File" size={20} className="text-primary" />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      {scanning && (
                        <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                      )}
                    </div>
                  ))}
                </div>

                {scanning && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Сканирование...</span>
                      <span className="text-sm text-muted-foreground">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Проверка с использованием 12 антивирусных движков
                    </p>
                  </div>
                )}

                {!scanning && (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 glow-effect mt-6"
                    size="lg"
                    onClick={startScan}
                  >
                    <Icon name="Search" size={20} className="mr-2" />
                    Начать проверку
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="p-6 text-center border-border/40 hover:border-primary/50 transition-all hover:glow-effect">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Быстрое сканирование</h4>
            <p className="text-sm text-muted-foreground">
              Результаты за секунды благодаря облачной инфраструктуре
            </p>
          </Card>
          
          <Card className="p-6 text-center border-border/40 hover:border-primary/50 transition-all hover:glow-effect">
            <div className="w-12 h-12 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="Layers" size={24} className="text-secondary" />
            </div>
            <h4 className="font-semibold mb-2">Множественная проверка</h4>
            <p className="text-sm text-muted-foreground">
              Сканирование 12+ движками одновременно
            </p>
          </Card>
          
          <Card className="p-6 text-center border-border/40 hover:border-primary/50 transition-all hover:glow-effect">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Lock" size={24} className="text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Конфиденциальность</h4>
            <p className="text-sm text-muted-foreground">
              Файлы удаляются сразу после проверки
            </p>
          </Card>
        </div>
      </section>

      <section id="features" className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">Возможности</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-border/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="FileCheck" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Все форматы файлов</h3>
                  <p className="text-muted-foreground">
                    Поддержка документов, архивов, изображений, видео, исполняемых файлов и более 300 форматов
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Globe" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">API для разработчиков</h3>
                  <p className="text-muted-foreground">
                    REST API с детальной документацией для интеграции в ваши приложения
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="History" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">История проверок</h3>
                  <p className="text-muted-foreground">
                    Сохранение результатов с детальными отчетами и возможностью экспорта
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="TrendingUp" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Аналитика угроз</h3>
                  <p className="text-muted-foreground">
                    Статистика обнаруженных угроз и рекомендации по безопасности
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Посмотреть все возможности
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 glow-text">О сервисе</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Технологии защиты</h3>
                <p className="text-muted-foreground mb-4">
                  VirusGuard использует передовые облачные технологии для обнаружения вредоносного ПО. 
                  Наша система агрегирует результаты от ведущих антивирусных движков мира.
                </p>
                <p className="text-muted-foreground">
                  Мы обрабатываем миллионы файлов ежедневно, постоянно обновляя базы данных угроз 
                  и улучшая алгоритмы детектирования.
                </p>
              </div>
              
              <Card className="p-6 border-border/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Движков проверки</span>
                    <span className="text-2xl font-bold text-primary">12+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Файлов в день</span>
                    <span className="text-2xl font-bold text-primary">2M+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Время сканирования</span>
                    <span className="text-2xl font-bold text-primary">&lt;5s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Точность</span>
                    <span className="text-2xl font-bold text-primary">99.8%</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 border-border/40 bg-card/50">
              <div className="flex items-start gap-4">
                <Icon name="Shield" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Безопасность превыше всего</h4>
                  <p className="text-muted-foreground">
                    Все файлы обрабатываются в изолированной среде. Мы не сохраняем ваши данные 
                    и не передаем их третьим лицам. Соединение защищено SSL-шифрованием.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 glow-text">Свяжитесь с нами</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Нужна помощь или хотите интегрировать наш сервис? Мы всегда рады помочь!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 border-border/40">
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-sm text-muted-foreground">support@virusguard.com</p>
              </Card>
              
              <Card className="p-6 border-border/40">
                <Icon name="MessageCircle" size={32} className="text-secondary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Чат</h4>
                <p className="text-sm text-muted-foreground">24/7 поддержка</p>
              </Card>
              
              <Card className="p-6 border-border/40">
                <Icon name="FileText" size={32} className="text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Документация</h4>
                <p className="text-sm text-muted-foreground">API & Гайды</p>
              </Card>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect">
              <Icon name="Send" size={20} className="mr-2" />
              Написать нам
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={18} className="text-white" />
              </div>
              <span className="font-semibold">VirusGuard</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 VirusGuard. Все права защищены.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
