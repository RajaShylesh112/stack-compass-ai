/**
 * AI Integration module for Python AI services
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';

const execAsync = promisify(exec);

export class AIService {
  private pythonPath: string;

  constructor() {
    this.pythonPath = process.cwd() + '/python-api';
  }

  async recommendStack(requestData: any): Promise<any> {
    try {
      // Write JSON to temporary file to avoid escaping issues
      const tempFile = `/tmp/ai_request_${Date.now()}.json`;
      await fs.writeFile(tempFile, JSON.stringify(requestData));
      
      const command = `cd ${this.pythonPath} && python3 -c "
import sys
import json
import os
sys.path.append('${this.pythonPath}')
from ai_module import ai_engine

with open('${tempFile}', 'r') as f:
    request_data = json.load(f)

result = ai_engine.recommend_stack(
    request_data.get('project_type', 'web'),
    request_data.get('requirements', []),
    request_data.get('team_size', 3),
    request_data.get('experience_level', 'intermediate')
)
print(json.dumps(result))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      // Clean up temp file
      try {
        await fs.unlink(tempFile);
      } catch (e) {
        // Ignore cleanup errors
      }
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      return JSON.parse(stdout.trim());
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getSupportedTechnologies(): Promise<any> {
    try {
      const command = `cd ${this.pythonPath} && python3 -c "
import sys
import json
sys.path.append('${this.pythonPath}')
from ai_module import ai_engine

result = ai_engine.get_supported_technologies()
print(json.dumps(result))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      return JSON.parse(stdout.trim());
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async analyzeCompatibility(technologies: string[]): Promise<any> {
    try {
      // Write JSON to temporary file to avoid escaping issues
      const tempFile = `/tmp/ai_compat_${Date.now()}.json`;
      await fs.writeFile(tempFile, JSON.stringify(technologies));
      
      const command = `cd ${this.pythonPath} && python3 -c "
import sys
import json
sys.path.append('${this.pythonPath}')
from ai_module import ai_engine

with open('${tempFile}', 'r') as f:
    technologies = json.load(f)

result = ai_engine.analyze_compatibility(technologies)
print(json.dumps(result))
"`;

      const { stdout, stderr } = await execAsync(command);
      
      // Clean up temp file
      try {
        await fs.unlink(tempFile);
      } catch (e) {
        // Ignore cleanup errors
      }
      
      if (stderr && stderr.trim() !== '') {
        console.error('Python stderr:', stderr);
      }
      
      if (!stdout || stdout.trim() === '') {
        throw new Error('No output from Python AI service');
      }
      
      return JSON.parse(stdout.trim());
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async checkStatus(): Promise<any> {
    try {
      const command = `python --version`;
      const { stdout } = await execAsync(command);
      
      return {
        ai_service_available: true,
        python_api_status: "embedded",
        python_version: stdout.trim(),
        features: {
          basic_recommendations: true,
          compatibility_analysis: true,
          technology_database: true,
          ai_enhanced: false
        }
      };
    } catch (error) {
      return {
        ai_service_available: false,
        python_api_status: "unavailable",
        error: error.message
      };
    }
  }
}

export const aiService = new AIService();